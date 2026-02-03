"use client";

import { useEffect } from "react";

export default function CustomCursor(): JSX.Element {
  useEffect(() => {
    const follower = document.querySelector<HTMLDivElement>(".follower");
    const cursor = document.querySelector<HTMLDivElement>(".cursor");

    const acceleration = 0.25;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let currX = x;
    let currY = y;

    const onMouseMove = (event: MouseEvent) => {
      x = event.pageX;
      y = event.pageY;
    };

    document.addEventListener("mousemove", onMouseMove);

    const update = (elm: HTMLDivElement | null, prop: string, val: number) => {
      if (elm) {
        elm.style.setProperty(prop, `${val}px`);
      }
    };

    const lerp = (a: number, b: number) => a + (b - a) * acceleration;

    const animate = () => {
      currX = lerp(currX, x);
      currY = lerp(currY, y);

      update(follower, "--mouse-x", currX);
      update(follower, "--mouse-y", currY);
      update(cursor, "--mouse-x", x);
      update(cursor, "--mouse-y", y);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div className="follower" />
      <div className="cursor" />
      <style jsx global>{`
        :root {
          /* Light mode (default) */
          --follower-color: #eb641e;      /* Orange ring */
          --cursor-color: rgb(119, 103, 92); /* Brownish dot */
          --size: 20px;
          --dot-size: 5px;
        }

        /* Dark mode overrides */
        .dark {
          --follower-color: #b5ff6d;
          --cursor-color: #b5ff6d; 
        }

        .follower {
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          position: absolute;
          transform: translate(var(--mouse-x), var(--mouse-y)) translate(-50%, -50%);
          background: transparent;
          border: 2px solid var(--follower-color);
          opacity: 0.6;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1),
            0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 100;
          pointer-events: none;
        }

        .cursor {
          width: var(--dot-size);
          height: var(--dot-size);
          border-radius: 50%;
          position: absolute;
          transform: translate(var(--mouse-x), var(--mouse-y)) translate(-50%, -50%);
          background: var(--cursor-color);
          z-index: 99;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
