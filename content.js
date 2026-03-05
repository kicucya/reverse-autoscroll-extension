(() => {
  const INDICATOR_SIZE = 36;
  // Chromium reference (autoscroll_controller.cc):
  // deadzone=15, exponent=2.2, multiplier=-0.000008 (before browser-side fling mapping).
  const DEADZONE_AXIS = 15;
  const NATIVE_EXPONENT = 2.2;
  const NATIVE_MULTIPLIER_PER_MS = 0.000008;
  const NATIVE_GAIN = 2.3;
  const FAR_ACCEL_THRESHOLD = 120;
  const FAR_ACCEL_GAIN = 0.012;
  const SMOOTHING = 28;
  const SPEED_HARD_MAX = 32000;
  const PIXEL_EPSILON = 0.02;

  let active = false;
  let anchorX = 0;
  let anchorY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let lastFrameTs = 0;
  let rafId = 0;
  let indicator = null;

  function createIndicator(x, y) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = `${x - INDICATOR_SIZE / 2}px`;
    el.style.top = `${y - INDICATOR_SIZE / 2}px`;
    el.style.width = `${INDICATOR_SIZE}px`;
    el.style.height = `${INDICATOR_SIZE}px`;
    el.style.borderRadius = '50%';
    el.style.border = '2px solid rgba(80, 80, 80, 0.92)';
    el.style.background = 'rgba(255, 255, 255, 0.86)';
    el.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.7) inset, 0 1px 6px rgba(0,0,0,0.28)';
    el.style.zIndex = '2147483647';
    el.style.pointerEvents = 'none';

    const up = document.createElement('div');
    up.style.position = 'absolute';
    up.style.left = '50%';
    up.style.top = '4px';
    up.style.transform = 'translateX(-50%)';
    up.style.width = '0';
    up.style.height = '0';
    up.style.borderLeft = '5px solid transparent';
    up.style.borderRight = '5px solid transparent';
    up.style.borderBottom = '8px solid rgba(80, 80, 80, 0.95)';

    const down = document.createElement('div');
    down.style.position = 'absolute';
    down.style.left = '50%';
    down.style.bottom = '4px';
    down.style.transform = 'translateX(-50%)';
    down.style.width = '0';
    down.style.height = '0';
    down.style.borderLeft = '5px solid transparent';
    down.style.borderRight = '5px solid transparent';
    down.style.borderTop = '8px solid rgba(80, 80, 80, 0.95)';

    const left = document.createElement('div');
    left.style.position = 'absolute';
    left.style.left = '4px';
    left.style.top = '50%';
    left.style.transform = 'translateY(-50%)';
    left.style.width = '0';
    left.style.height = '0';
    left.style.borderTop = '5px solid transparent';
    left.style.borderBottom = '5px solid transparent';
    left.style.borderRight = '8px solid rgba(80, 80, 80, 0.95)';

    const right = document.createElement('div');
    right.style.position = 'absolute';
    right.style.right = '4px';
    right.style.top = '50%';
    right.style.transform = 'translateY(-50%)';
    right.style.width = '0';
    right.style.height = '0';
    right.style.borderTop = '5px solid transparent';
    right.style.borderBottom = '5px solid transparent';
    right.style.borderLeft = '8px solid rgba(80, 80, 80, 0.95)';

    el.append(up, down, left, right);
    document.documentElement.appendChild(el);
    return el;
  }

  function removeIndicator() {
    if (indicator && indicator.isConnected) {
      indicator.remove();
    }
    indicator = null;
  }

  function getAxisVelocity(deltaCssPx) {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const delta = deltaCssPx / dpr;
    if (Math.abs(delta) <= DEADZONE_AXIS) {
      return 0;
    }
    const sign = delta < 0 ? -1 : 1;
    const absDelta = Math.abs(delta);
    const magnitudePerMs = Math.pow(absDelta, NATIVE_EXPONENT) * NATIVE_MULTIPLIER_PER_MS;
    let velocityPerSec = magnitudePerMs * 1000 * NATIVE_GAIN;
    if (absDelta > FAR_ACCEL_THRESHOLD) {
      velocityPerSec *= 1 + (absDelta - FAR_ACCEL_THRESHOLD) * FAR_ACCEL_GAIN;
    }
    return Math.min(SPEED_HARD_MAX, velocityPerSec) * sign;
  }

  function getTargetVelocity(dx, dy) {
    // Reverse direction: pointer-down means page-up and vice versa.
    return {
      vx: -getAxisVelocity(dx),
      vy: -getAxisVelocity(dy)
    };
  }

  function tick(ts) {
    if (!active) {
      return;
    }

    if (!lastFrameTs) {
      lastFrameTs = ts;
    }
    const dt = Math.min(40, ts - lastFrameTs) / 1000;
    lastFrameTs = ts;

    const dx = mouseX - anchorX;
    const dy = mouseY - anchorY;
    const target = getTargetVelocity(dx, dy);
    const alpha = 1 - Math.exp(-SMOOTHING * dt);

    velocityX += (target.vx - velocityX) * alpha;
    velocityY += (target.vy - velocityY) * alpha;

    const scrollX = velocityX * dt;
    const scrollY = velocityY * dt;
    if (Math.abs(scrollX) > PIXEL_EPSILON || Math.abs(scrollY) > PIXEL_EPSILON) {
      window.scrollBy(scrollX, scrollY);
    }

    rafId = requestAnimationFrame(tick);
  }

  function start(clientX, clientY) {
    stop();
    active = true;
    anchorX = clientX;
    anchorY = clientY;
    mouseX = clientX;
    mouseY = clientY;
    velocityX = 0;
    velocityY = 0;
    lastFrameTs = 0;
    indicator = createIndicator(clientX, clientY);
    document.documentElement.style.cursor = 'all-scroll';
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    if (!active) {
      return;
    }

    active = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    velocityX = 0;
    velocityY = 0;
    lastFrameTs = 0;
    removeIndicator();
    document.documentElement.style.cursor = '';
  }

  function onMouseDown(e) {
    if (e.button === 1) {
      // Fully take over middle-click to suppress native autoscroll UI/logic.
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    if (active) {
      stop();
    }
  }

  function onMouseUp(e) {
    if (e.button !== 1) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();

    if (active) {
      stop();
    } else {
      start(e.clientX, e.clientY);
    }
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function onKeyDown(e) {
    if (active && e.key === 'Escape') {
      e.preventDefault();
      stop();
    }
  }

  document.addEventListener('mousedown', onMouseDown, { capture: true, passive: false });
  document.addEventListener('mouseup', onMouseUp, { capture: true, passive: false });
  document.addEventListener('mousemove', onMouseMove, { capture: true, passive: true });
  document.addEventListener('keydown', onKeyDown, { capture: true });

  window.addEventListener('blur', stop);
})();
