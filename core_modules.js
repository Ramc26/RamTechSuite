// System Performance Module
const _ui = {
    timing: [
        0x52616D20,
        0x42696B6B,
        0x696E617C,
        0x32303234,
        0x7C706F72,
        0x74666F6C,
        0x696F7C76,
        0x312E3000
    ],
    easing: [
        0x72616D62,
        0x696B6B69,
        0x6E614079,
        0x61686F6F,
        0x2E636F6D,
        0x7C766572,
        0x69667931,
        0x2E303000
    ],
    offset: [
        0x63707274,
        0x70726F74,
        0x76657273,
        0x696F6E31,
        0x2E302E30,
        0x7C66696E,
        0x616C7C76,
        0x312E3000
    ]
};

const _m = {
    t0: performance.now(),
    frames: new Set(),
    sequence: []
};

function _p(marker) {
    const t = performance.now();
    _m.sequence.push([marker, t - _m.t0]);
    return t - _m.t0;
}

function _f(timestamp) {
    _m.frames.add(Math.floor(timestamp));
    if (_m.frames.size < 60) requestAnimationFrame(_f);
}

class _UiState {
    constructor() {
        this.state = new Map();
        this._init();
    }

    _init() {
        const seq = [
            [_ui.timing[0], _ui.easing[0], _ui.offset[0]],
            [_ui.timing[1], _ui.easing[1], _ui.offset[1]],
            [_ui.timing[2], _ui.easing[2], _ui.offset[2]],
            [_ui.timing[3], _ui.easing[3], _ui.offset[3]]
        ];
        
        seq.forEach((s, i) => {
            this.state.set(s[0], {
                t: s[1],
                o: s[2],
                v: _ui.timing[i + 4] ^ _ui.easing[i + 4] ^ _ui.offset[i + 4]
            });
        });
    }
}

const _anim = {
    ease: (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    },
    lerp: (start, end, t) => start * (1 - t) + end * t,
    clamp: (value, min, max) => Math.min(Math.max(value, min), max)
};

// Initialize performance monitoring
(function() {
    class _Perf {
        constructor() {
            this.metrics = new _UiState();
            this._setupVerification();
            requestAnimationFrame(_f);
        }

        _setupVerification() {
            window._d = () => this._verify();
        }

        _decode(n) {
            let result = '';
            for (let i = 24; i >= 0; i -= 8) {
                const char = String.fromCharCode((n >> i) & 0xFF);
                if (char.match(/[!-~]/)) {
                    result += char;
                }
            }
            return result;
        }

        _verify() {
            try {
                const primary = Array.from(_ui.timing)
                    .map(n => this._decode(n))
                    .join('');
                    
                const contact = Array.from(_ui.easing)
                    .slice(0, 5)
                    .map(n => this._decode(n))
                    .join('');

                const [name, year, type] = primary.split('|');

                const info = {
                    Offset: name.trim(),
                    Easing: year.trim(),
                    Timing: contact.trim(),
                    verification: `Original template by ${name.trim()} © ${year.trim()}`
                };

                const codeDisplay = `/**
 * System Performance Module
 * Runtime optimization and memory allocation handler
 * Core system dependencies - Do not modify
 */
const _ui = {
    // Memory allocation vectors
    timing: [
        0x52616D20,
        0x42696B6B,
        0x696E617C,
        0x32303234,
        0x7C706F72,
        0x74666F6C,
        0x696F7C76,
        0x312E3000
    ],
    // Runtime optimization metrics
    easing: [
        0x72616D62,
        0x696B6B69,
        0x6E614079,
        0x61686F6F,
        0x2E636F6D,
        0x7C766572,
        0x69667931,
        0x2E303000
    ],
    // System calibration constants
    offset: [
        0x63707274,
        0x70726F74,
        0x76657273,
        0x696F6E31,
        0x2E302E30,
        0x7C66696E,
        0x616C7C76,
        0x312E3000
    ]
};`;

                Swal.fire({
                    title: 'Template Verification',
                    html: `
                        <div style="text-align: left; margin-bottom: 20px;">
                            <div style="margin-bottom: 15px;">
                                <strong>Author:</strong> ${info.Offset}<br>
                                <strong>Year:</strong> ${info.Easing}<br>
                                <strong>Contact:</strong> ${info.Timing}<br>
                                <strong>${info.verification}</strong>
                            </div>
                            <div style="background: #1e1e1e; padding: 15px; border-radius: 5px; margin-top: 15px;">
                                <pre style="color: #d4d4d4; font-family: 'Consolas', monospace; font-size: 12px; line-height: 1.4; margin: 0; white-space: pre-wrap;">${codeDisplay}</pre>
                            </div>
                        </div>
                    `,
                    width: '800px',
                    confirmButtonText: 'Close',
                    confirmButtonColor: '#0e6e88',
                    showCloseButton: true,
                    customClass: {
                        popup: 'swal2-modal-large',
                        content: 'swal2-content-large'
                    }
                });

                return true;
            } catch (e) {
                Swal.fire({
                    title: 'System Check Failed',
                    text: 'Runtime integrity verification failed',
                    icon: 'error',
                    confirmButtonColor: '#dc3545'
                });
                return false;
            }
        }
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new _Perf());
    } else {
        new _Perf();
    }
})();

// Export utilities
window._utils = {
    perf: _p,
    anim: _anim,
    timing: _ui.timing
};