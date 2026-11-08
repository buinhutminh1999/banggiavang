import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const GoldParticles = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: { enable: true, zIndex: 0 },
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: false,
                        },
                        resize: true,
                    },
                },
                particles: {
                    color: {
                        value: ["#FFD700", "#FFECB3", "#FFB300", "#FFF8E1", "#FF8F00"],
                    },
                    links: {
                        enable: false,
                    },
                    move: {
                        direction: "top",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: 0.45,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 950,
                        },
                        value: 20,
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.6 },
                        animation: {
                            enable: true,
                            speed: 0.9,
                            minimumValue: 0.08,
                            sync: false
                        }
                    },
                    shape: {
                        type: ["circle", "star"],
                    },
                    size: {
                        value: { min: 1.5, max: 4 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default React.memo(GoldParticles);
