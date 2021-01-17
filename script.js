  console.clear();
  let completedLights = [0, 0, 0, 0];

  new Draggable('.drag-1', {
    onDrag: function () { updateLine('.line-1', this.x + 120, this.y + 185); },
    onRelease: function () {
      if (this.x !== 670 || this.y !== 188 ) {
        reset('.drag-1', '.line-1', 70, 185);
        toggleLight(2, false);
      } else if (this.x === 670 && this.y === 188) toggleLight(2, true)
    },
    liveSnap: {points: [{x: 670, y: 188}],radius: 20}
  });
  new Draggable('.drag-2', {
    onDrag: function () { updateLine('.line-2', this.x + 120, this.y + 375); },
    onRelease: function () {
      if (this.x !== 670 || this.y !== -188 ) {
        reset('.drag-2', '.line-2', 60, 375);
        toggleLight(1, false);
      } else if (this.x === 670 && this.y === -188) toggleLight(1, true)
    },
    liveSnap: {points: [{x: 670, y: -188}],radius: 20}
  });
  new Draggable('.drag-3', {
    onDrag: function () { updateLine('.line-3', this.x + 120, this.y + 560); },
    onRelease: function () {
      if (this.x !== 670 || this.y !== 0 ) {
        reset('.drag-3', '.line-3', 60, 560);
        toggleLight(3, false);
      } else if (this.x === 670 && this.y === 0) toggleLight(3, true)
    },
    liveSnap: {points: [{x: 670, y: 0}],radius: 20}
  });
  new Draggable('.drag-4', {
    onDrag: function () { updateLine('.line-4', this.x + 120, this.y + 745); },
    onRelease: function () {
      if (this.x !== 670 || this.y !== 0 ) {
        reset('.drag-4', '.line-4', 60, 745);
        toggleLight(4, false);
      } else if (this.x === 670 && this.y === 0) toggleLight(4, true)
    },
    liveSnap: {points: [{x: 670, y: 0}],radius: 20}
  });

  function updateLine(selector, x, y) {
    gsap.set(selector, {
      attr: {
        x2: x,
        y2: y
      }
    });
  }

  function toggleLight(selector, visibility) {
    if (visibility) {
      completedLights[selector - 1] = 1;
      if (completedLights[0] === 1 && completedLights[1] === 1 && completedLights[2] === 1 && completedLights[3] === 1) {
        audioTask.play();
        window.setTimeout(() => {
          reset('.drag-1', '.line-1', 70, 185);
          reset('.drag-2', '.line-2', 60, 375);
          reset('.drag-3', '.line-3', 60, 560);
          reset('.drag-4', '.line-4', 60, 745);
          toggleLight(2, false);
          toggleLight(1, false);
          toggleLight(3, false);
          toggleLight(4, false);
        }, 2000);
      }
    } else {
      completedLights[selector - 1] = 0;
    }
    
    gsap.to(`.light-${selector}`, {
      opacity: visibility ? 1 : 0,
      duration: 0.3
    });
  }

  function reset(drag, line, x, y) {
    gsap.to(drag, {
      duration: 0.3,
      ease: 'power2.out',
      x: 0,
      y: 0
    });
    gsap.to(line, {
      duration: 0.3,
      ease: 'power2.out',
      attr: {
        x2: x,
        y2: y
      }
    });
  }

  const audioTask = new Audio("./audio/amongus-task-complete.mp3");