class splitFlap {
    // And even more ///////////////////////////////////////////
    #chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', ' ', ':', '.', '-', '_', '/', '♥', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    constructor(options) {
        if(!options){
            options = {};
        };
        this.speed = .008; // seconds
        this.changeTime = options.changeTime != null ? options.changeTime : 3000;
        this.loop = options.loop != null ? options.loop : true;
        this.beginStr = options.beginText ? options.beginText.toUpperCase().split("") : [5].fill(" ");
        this.endStr = options.endText ? options.endText.toUpperCase().split("") : [5].fill(" ");
        // A-Z, 0-9, spaces only
        this.amountOfFlaps = (options.size != null) ? options.size : (this.beginStr.length >= this.endStr.length) ? this.beginStr.length : this.endStr.length;
        this.flaps = [this.amountOfFlaps];
        this.div = document.createElement("div");
        this.div.style.display = 'flex';
        this.div.style.justifyContent = 'center';
        if (options.parent != null) {
            this.parent = options.parent;
        } else {
            this.parent = document.body;
        }
        this.parent.appendChild(this.div);

        for (var x = 0; x < this.amountOfFlaps; x++) {
            var flap = splitFlapElm.getInstance(this.speed);
            this.flaps[x] = flap;
            this.div.appendChild(flap.splitflap);
        }

        this.strCount = [], this.flag = [];

        for (var x = 0; x < this.amountOfFlaps; x++) {

            if (this.beginStr.length < this.amountOfFlaps) {
                this.beginStr=this.beginStr.concat(new Array(this.amountOfFlaps - this.beginStr.length).fill(" "));
            }
            else if (this.endStr.length < this.amountOfFlaps) {
                this.endStr=this.endStr.concat(new Array(this.amountOfFlaps - this.endStr.length).fill(" "));
            }
        }
        for (var x = 0; x < this.amountOfFlaps; x++) {
            this.flaps[x].setStrCount(this.#chars.indexOf(this.beginStr[x]));
            this.flaps[x].setFlag(false), this.flag2 = true;
        }

        // Flip them flaps /////////////////////////////////////////
        this.loopInterval = setInterval(this.tick.bind(this), this.speed * 1000);

    }

    tick() {
        for (var x = 0; x < this.amountOfFlaps; x++) {

            if (this.flaps[x].getB1Val() == this.endStr[x]) {
                this.flaps[x].dontFlipIt();
            } else {
                this.flaps[x].flipIt();
            }

            if (this.flaps.every(function (e) {
                return e.getFlagVal();
            }) && this.flag2) {
                if (this.loop) {
                    this.flag2 = false;
                    setTimeout(this.changeText.bind(this), this.changeTime);
                }
            }
        }

    }

    setFlapsWidth(width) {
        var r = document.querySelector(':root');
        r.style.setProperty('--flapWidth', width + 'px');
    }

    setText(text) {
        this.beginStr = this.endStr;
        this.endStr = text.toUpperCase().split("");

        if (this.beginStr.length < this.amountOfFlaps) {
            this.beginStr=this.beginStr.concat(new Array(this.amountOfFlaps - this.beginStr.length).fill(" "));
        }
        
        if (this.endStr.length < this.amountOfFlaps) {
            this.endStr=this.endStr.concat(new Array(this.amountOfFlaps - this.endStr.length).fill(" "));
        }
        this.tick();
    }

    loop() {
        this.flag2 = false;
        setTimeout(this.changeText.bind(this), 3000);
    }

    roll(dir, time) {
        this.rollTime = time || 1000;
        if (dir == "right") {
            this.endStr.push(" ");
            this.rollInterval = setInterval(this.rollRight.bind(this), this.rollTime);
        } else {
            this.endStr.push(" ");
            this.rollInterval = setInterval(this.rollLeft.bind(this), this.rollTime);
        }
    }

    rollLeft() {
        if (this.flag2) {
            this.beginStr = this.endStr;
            this.endStr = this.beginStr.slice(1, this.beginStr.length).concat(this.beginStr.slice(0, 1));
            this.tick();
        }
    }

    rollRight() {
        if (this.flag2) {
            this.beginStr = this.endStr;
            this.endStr = this.beginStr.slice(this.beginStr.length - 1, this.beginStr.length).concat(this.beginStr.slice(0, this.beginStr.length-1));
            this.tick();
        }
    }

    changeText() {
        this.flaps.every(function (e) {
            e.setFlag(false);
        });
        this.flag2 = true;

        var tempArr = this.endStr.slice();
        this.endStr = this.beginStr.slice();
        this.beginStr = tempArr.slice();
    }
}

class splitFlapElm {
    #chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', ' ', ':', '.', '-', '_', '/', '♥', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    static chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', ' ', ':', '.', '-', '_', '/', '♥', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    constructor(speed) {
        this.speed = speed || 0.2; // seconds
        this.strCount = 0;
        this.flag = false;
        this.splitflap = this.getSplitFlapElm();
    }

    static getInstance(speed) {
        return new splitFlapElm(speed);
    }

    getSplitFlapElm() {
        this.splitflap = document.createElement("div");
        this.splitflap.className = "splitflap";

        let subElm = document.createElement("div");
        subElm.style.animationDuration = this.speed + "s";

        this.a1 = subElm.cloneNode();
        this.a1.className = "top";

        this.a2 = subElm.cloneNode();
        this.a2.className = "bottom";

        this.b1 = subElm.cloneNode();
        this.b1.className = "nextFull";

        this.b2 = subElm.cloneNode();
        this.b2.className = "nextHalf";

        this.splitflap.appendChild(this.a1);
        this.splitflap.appendChild(this.a2);
        this.splitflap.appendChild(this.b1);
        this.splitflap.appendChild(this.b2);

        return this.splitflap;
    }

    flipIt() {
        this.a1.innerHTML = this.#chars[(this.strCount == 0) ? this.#chars.length - 1 : this.strCount - 1];
        this.a2.innerHTML = this.#chars[(this.strCount == 0) ? this.#chars.length - 1 : this.strCount - 1];
        this.b1.innerHTML = this.#chars[this.strCount];
        this.b2.innerHTML = this.#chars[this.strCount];

        this.a2.classList.remove("flip1");
        this.a2.style.display = 'none';
        this.a2.offsetWidth; // This will trigger a recalculation of offsetWidth
        this.a2.style.display = ''; // 
        this.a2.classList.add("flip1");

        this.b2.classList.remove("flip2");
        this.b2.style.display = 'none';
        this.b2.offsetWidth; // This will trigger a recalculation of offsetWidth
        this.b2.style.display = ''; // 
        this.b2.classList.add("flip2");

        if (this.strCount > this.#chars.length - 2) this.strCount = 0;
        else this.strCount++;
    }

    dontFlipIt() {
        this.flag = true;
        this.a2.classList.remove("flip2");
        this.a2.style.backgroundColor = "#000000";
        this.b2.style.backgroundColor = "#000000";
        this.a1.innerHTML = this.#chars[(this.strCount == 0) ? this.#chars.length - 1 : this.strCount - 1];
        this.a2.innerHTML = this.#chars[(this.strCount == 0) ? this.#chars.length - 1 : this.strCount - 1];
    }

    static getChars() {
        return this.chars;
    }

    getA1Val() {
        return this.a1.innerHTML;
    }

    getA2Val() {
        return this.a2.innerHTML;
    }

    getB1Val() {
        return this.b1.innerHTML;
    }

    getB2Val() {
        return this.b2.innerHTML;
    }

    getStrCountVal() {
        return this.strCount.valueOf();
    }

    setStrCount(x) {
        this.strCount = x;
    }

    getFlagVal() {
        return this.flag.valueOf();
    }

    setFlag(x) {
        this.flag = x;
    }
}
