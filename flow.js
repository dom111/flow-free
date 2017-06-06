(function() {
    var _lastColor = null,
    _currentColor,

    _lastBlock = null,
    _currentBlock,

    _currentPath = {},

    _isTracing = false,

    _size,
    _moves = 0,

    _init = function() {
        var levels = {
            '3': ['a1abc2bc'],
            '8': ['2b7gfe5d10d1f3b1g2e1c2ca1h3a5h5'],
            '15': ['4o1i9l6a11eb5g5e20j2g26n9f1f9l7h1o7n10j7c6pd3mc4h5p6im3kad23b2k1']
        };

        levels = ['a1abc2bc', '2b7gfe5d10d1f3b1g2e1c2ca1h3a5h5', '4o1i9l6a11eb5g5e20j2g26n9f1f9l7h1o7n10j7c6pd3mc4h5p6im3kad23b2k1'];

        _loadLevel(levels[Math.floor(Math.random() * levels.length)]);

        var grid = document.querySelector('.grid');

        _size = parseInt(grid.getAttribute('data-size'));

        Array.from(grid.querySelectorAll('div')).forEach(function(block, i) {
            var colorId = parseInt(block.getAttribute('data-id')),
            isPoint = block.getAttribute('data-point') === 'true';

            block.setAttribute('data-i', i);

            if ('ontouchstart' in document) {
                block.addEventListener('touchstart', _mouseDownHandler, false);
                block.addEventListener('touchmove', _mouseMoveHandler, false);
                block.addEventListener('touchend', _mouseUpHandler, false);
            }
            else {
                block.addEventListener('mousedown', _mouseDownHandler, false);
                block.addEventListener('mousemove', _mouseMoveHandler, false);
                block.addEventListener('mouseup', _mouseUpHandler, false);
            }
        });
    },
    _loadLevel = function(s) {
        var data = [];

        while (s.length) {
            s = s.replace(/^\d+|[a-z]/i, function(x) {
                if (parseInt(x)) {
                    while (x--) {
                        data.push(0);
                    }
                }
                else {
                    data.push(parseInt(x, 36) - 9);
                }

                return '';
            });
        }

        var grid = document.querySelector('.grid'),
        size = Math.sqrt(data.length);

        if (size !== parseInt(size)) {
            // throw 'Invalid grid definition.'; //
            console.error('Invalid grid definition.');

            return;
        }
        else {
            grid.setAttribute('data-size', size);
        }

        grid.innerHTML = '';

        data.forEach(function(n) {
            var block = document.createElement('div');

            if (n) {
                block.setAttribute('data-id', n);
                block.setAttribute('data-point', 'true');
            }

            grid.appendChild(block);
        });
    },
    _isNeighbour = function(i, j) {
        var x = (i % _size) - (j % _size),
        y = Math.floor(i / _size) - Math.floor(j / _size);

        if (x === -1 && y === 0) {
            return 'l';
        }
        else if (x === 1 && y === 0) {
            return 'r';
        }
        else if (x === 0 && y === -1) {
            return 't';
        }
        else if (x === 0 && y === 1) {
            return 'b';
        }

        return false;

        // return (Math.abs(point1.x - point2.x) === 1 && Math.abs(point1.y - point2.y) === 0) ||
        //     (Math.abs(point1.x - point2.x) === 0 && Math.abs(point1.y - point2.y) === 1);
    },
    _cleanAll = function(items, limit) {
        if (!items.length) {
            return [];
        }

        var colorId = items[0].getAttribute('data-id');
        Array.from(document.querySelector('.grid').querySelectorAll('div[data-id="' + colorId + '"]')).forEach(function(block) {
            block.removeAttribute('data-completed');
        });

        limit = limit || 1;

        if (items && items.length) {
            while (items.length > limit) {
                var block = items.pop(),
                previousBlock = items[items.length - 1],
                direction = _isNeighbour(previousBlock.getAttribute('data-i'), block.getAttribute('data-i'));

                if (block.getAttribute('data-point') !== 'true') {
                    block.removeAttribute('data-id');
                }

                block.removeAttribute('data-' + direction);
                previousBlock.removeAttribute('data-' + ({t:'b',b:'t',l:'r',r:'l'}[direction]));
            }
        }

        if (items.length === 1) {
            items.pop();
        }

        return items;
    },
    _mouseDownHandler = function(event) {
        // DEBOUNCE
        var colorId = parseInt(this.getAttribute('data-id'));

        if (!colorId) {
            return;
        }

        if (event.type.match(/^mouse/) && event.which !== 1) {
            return;
        }

        if (_currentColor !== _lastColor) {
            _moves++;
        }

        _lastColor = _currentColor;
        _currentColor = colorId;

        if (_currentBlock !== event.target) {
            _lastBlock = _currentBlock;
            _currentBlock = event.target;

            if (_currentBlock.getAttribute('data-point') === 'true') {
                if (_currentPath[_currentColor]) {
                    _currentPath[_currentColor] = _cleanAll(_currentPath[_currentColor]);
                }
                else {
                    _currentPath[_currentColor] = [];
                }
            }
            else {
                var pathIndex = _currentPath[_currentColor].indexOf(event.target);

                if (pathIndex > -1) {
                    _currentPath[_currentColor] = _cleanAll(_currentPath[_currentColor], pathIndex + 1);
                    _lastBlock = _currentPath[_currentColor][_currentPath[_currentColor].length - 1];
                }
            }

            _currentPath[_currentColor].push(_currentBlock);
        }

        _isTracing = true;

        event.preventDefault();
    },
    _mouseMoveHandler = function(event) {
        if (!_isTracing) {
            return;
        }

        var newBlock = event.target;

        if (event.type.match(/^touch/)) {
            newBlock = document.elementFromPoint(event.touches[0].pageX, event.touches[0].pageY);

            if (!newBlock) {
                return;
            }
        }

        if (!_currentBlock) {
            console.log('no current block');
            return;
        }

        if (newBlock !== _currentBlock) {
            var matchDirection = _isNeighbour(_currentBlock.getAttribute('data-i'), newBlock.getAttribute('data-i'));

            if (matchDirection) {
                var newColor = newBlock.getAttribute('data-id'),
                isPoint = newBlock.getAttribute('data-point') === 'true';

                if (newColor == _currentColor) {
                    var pathIndex = _currentPath[_currentColor].indexOf(newBlock);

                    if (pathIndex > -1) {
                        _currentPath[_currentColor] = _cleanAll(_currentPath[_currentColor], pathIndex + 1);
                        _currentBlock = _currentPath[_currentColor][_currentPath[_currentColor].length - 1];
                        _lastBlock = _currentPath[_currentColor][_currentPath[_currentColor].length - 2];
                    }
                    else {
                        if (isPoint) {
                            _lastBlock = _currentBlock;
                            _currentBlock = newBlock;
                            _currentPath[_currentColor].push(_currentBlock);

                            _currentPath[_currentColor].forEach(function(block) {
                                block.setAttribute('data-completed', 'true');
                            });

                            _currentBlock.setAttribute('data-id', _currentColor);
                            _currentBlock.setAttribute('data-' + matchDirection, '');
                            _lastBlock.setAttribute('data-' + ({t:'b',b:'t',l:'r',r:'l'}[matchDirection]), '');
                        }
                        else {
                            console.log('here: ' + _currentPath[_currentColor].length);
                            console.log(_currentPath[_currentColor]);
                        }
                    }
                }
                else if (!newColor) {
                    if (_currentBlock.getAttribute('data-point') && _currentPath[_currentColor].length > 1) {
                        return;
                    }
                    else {
                        _lastBlock = _currentBlock;
                        _currentBlock = newBlock;

                        _currentBlock.setAttribute('data-id', _currentColor);
                        _currentBlock.setAttribute('data-' + matchDirection, '');
                        _lastBlock.setAttribute('data-' + ({t:'b',b:'t',l:'r',r:'l'}[matchDirection]), '');
                        _currentPath[_currentColor].push(_currentBlock);
                    }
                }
            }
        }

        event.preventDefault();
    },
    _mouseUpHandler = function(event) {
        if (!_isTracing) {
            return;
        }

        _isTracing = false;

        event.preventDefault();
    };

    _init();
})();
