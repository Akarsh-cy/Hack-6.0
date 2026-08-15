"use client"

export default function HackBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="hack-atmosphere absolute inset-0" />


            {/* ================================================================
          DEEP VIOLET ATMOSPHERE
          ================================================================ */}

            <div className="hack-violet-haze absolute inset-0" />


            {/* ================================================================
          GRID LAYER 1
          Main structural grid
          ================================================================ */}

            <div
                className="hack-grid hack-grid-main absolute inset-[-70px]"
                style={{
                    backgroundImage: `
            linear-gradient(
              rgba(75, 0, 130, 0.52) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(75, 0, 130, 0.52) 1px,
              transparent 1px
            )
          `,
                    backgroundSize: "52px 52px",
                }}
            />


            {/* ================================================================
          GRID LAYER 2
          Very subtle depth layer
          ================================================================ */}

            <div
                className="hack-grid hack-grid-depth absolute inset-[-90px]"
                style={{
                    backgroundImage: `
            linear-gradient(
              rgba(255, 255, 255, 0.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.12) 1px,
              transparent 1px
            )
          `,
                    backgroundSize: "104px 104px",
                }}
            />


            {/* ================================================================
          CYAN ATMOSPHERE
          ================================================================ */}

            <div className="hack-glow hack-glow-cyan" />


            {/* ================================================================
          PINK ATMOSPHERE
          ================================================================ */}

            <div className="hack-glow hack-glow-pink" />


            {/* ================================================================
          VIOLET ATMOSPHERE
          ================================================================ */}

            <div className="hack-glow hack-glow-purple" />


            {/* ================================================================
          VERY SUBTLE LIGHT HAZE
          ================================================================ */}

            <div className="hack-haze absolute inset-0" />


            {/* ================================================================
          SCANLINES
          ================================================================ */}

            <div className="hack-scanlines absolute inset-0" />


            {/* ================================================================
          SPARSE PARTICLES
          ================================================================ */}

            <div className="hack-particles absolute inset-0">
                <span className="hack-particle p1" />
                <span className="hack-particle p2" />
                <span className="hack-particle p3" />
                <span className="hack-particle p4" />
                <span className="hack-particle p5" />
                <span className="hack-particle p6" />
                <span className="hack-particle p7" />
                <span className="hack-particle p8" />
                <span className="hack-particle p9" />
                <span className="hack-particle p10" />
                <span className="hack-particle p11" />
                <span className="hack-particle p12" />
                <span className="hack-particle p13" />
                <span className="hack-particle p14" />
                <span className="hack-particle p15" />
                <span className="hack-particle p16" />
            </div>


            {/* ================================================================
          VERY SUBTLE GEOMETRIC ACCENTS
          ================================================================ */}

            <div className="hack-geometry hack-geometry-one" />
            <div className="hack-geometry hack-geometry-two" />
            <div className="hack-geometry hack-geometry-three" />

        </div>
    )
}