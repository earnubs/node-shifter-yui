/**
 * create a content block which will pin to the top of the window when it
 * is beyond the bounds of the viewport, and park when it reaches an
 * optional limit
 *
 * @module pinandslide
 */

function PinAndSlide(config) {
    PinAndSlide.superclass.constructor.apply(this, arguments);
}

PinAndSlide.NAME = "pinandslide";

PinAndSlide.ATTRS = {
    isPinned: {
        value: true,
        validator: this._validateIsPinned
    },
    containerWidth: {
        value: 0
    }
};

/**
 * returns a namespaced class name
 *
 * @method
 * @param {String} string to be appended at the end of class name
 * @return
 * @private
 */
function makeClassName(str) {
    return Y.Widget.getClassName(PinAndSlide.NAME, str);
}


PinAndSlide.CSS_CLASSES = {
    content: makeClassName("content"),
    track: makeClassName("track"),
    car: makeClassName("car"),
    pinned: makeClassName("pinned")
};

PinAndSlide.RAIL_TEMPLATE = "<div class=" + 
    PinAndSlide.CSS_CLASSES.track
+"></div>";

PinAndSlide.CAR_TEMPLATE = "<div class=" + 
    PinAndSlide.CSS_CLASSES.car
+"></div>";


PinAndSlide.HTML_PARSER = {
    containerWidth: function (srcNode) {
        return srcNode.get("offsetWidth");
    }
};

Y.extend(PinAndSlide, Y.Widget, {

    initializer: function (config) {
        /** 
         * selector for a node beyond which the widget should
         * not slide
         */
        if (config && config.limitNode) {
            this.LIMITNODE =  Y.one(config.limitNode);
        }

        /**
         * the minimum width under which to set containerWidth
         */
        if (config && config.widthThreshold) {
            this.MIN_WIDTH = config.widthThreshold;
        }
    },

    renderUI: function () {
        var cb = this.get("contentBox"),
            CSS = PinAndSlide.CSS_CLASSES;

        cb.wrap(PinAndSlide.RAIL_TEMPLATE).wrap(PinAndSlide.CAR_TEMPLATE);

    },

    bindUI: function () {
        Y.after("scroll", Y.bind(this._handleScroll, this));
        Y.after("windowresize", Y.bind(this._handleWindowResize, this));
        Y.after("load", Y.bind(this._handleScroll, this));
        this.after("isPinnedChange", this._afterIsPinnedChange);
        this.after("isLimitChange", this._afterIsLimitChange);
        this.after("containerWidthChange", this._afterContainerWidthChange);
    },

    syncUI: function () {

        var scroll = Y.one(Y.config.win).get("scrollTop"),
            cb = this.get("contentBox");
        this.updateIsPinned(scroll);
        this.updateIsLimit(scroll);

        this.offsetY =  cb.getY();
        this.setContainerWidth(this.get("containerWidth"));

        if (this.LIMITNODE) {
            this.set("limitY", this.LIMITNODE.getY() - (parseInt(cb.get("offsetHeight"), 10)));
        }
    },

    // validator function for the isPinned attr
    _validateIsPinned: function (value) {
        return Y.Lang.isBoolean(value);
    },

    _handleScroll: function () {

        var scroll = Y.one(Y.config.win).get("scrollTop");
        this.updateIsPinned(scroll);
        this.updateIsLimit(scroll);

    },

    _handleWindowResize: function () {
        this.set("containerWidth", this.get("boundingBox").get("offsetWidth"));

        if (this.LIMITNODE) {
            this.set("limitY",
                     this.LIMITNODE.getY() - (parseInt(this.get("contentBox").get("offsetHeight"), 10)));
        }
    },

    /**
     * In situations where the widget has and inherited width we need to 
     * set the width on the contentBox to maintain layout
     * @param {Number} width with to set container 
     */
setContainerWidth: function (width) {
                       if (this.MIN_WIDTH) {
                           var innerWidth = Y.one(Y.config.win).get("innerWidth") || document.documentElement.clientWidth;
                           if (innerWidth > this.MIN_WIDTH || !this.MIN_WIDTH) {
                               return this.get("contentBox").setStyle("width", width);
                           } 

    this.get("contentBox").removeAttribute("style");
}
return false;
        },

        /**
         * @param {Number} scroll distance in pixels the window has scrolled
         */
        updateIsPinned: function (scroll) {
            this.set("isPinned", (this.offsetY < scroll));
        },

        /**
         * @param {Number} scroll distance in pixels the window has scrolled
         */
        updateIsLimit: function (scroll) {
            this.set("isLimit", (this.get("limitY") <= scroll));
        },

        /**
         * handle changes to the isPinned attr
         * true means we want to slide (pinned to top of window) and false
         * puts the widget back in the page
         * @param {Event} e YUI event facade
         */
        _afterIsPinnedChange: function (e) {
            var CSS = PinAndSlide.CSS_CLASSES,
                el = this.get("contentBox").ancestor("."+CSS.car),
                elHasClass = el.hasClass(CSS.pinned);

            // if should be pinned and isn't already, pin
            if (e.newVal && !elHasClass) {
                el.addClass(CSS.pinned);
            } else if (elHasClass) {
                // otherwise remove pin if we have one 
                el.removeClass(CSS.pinned);
            }
        },

        /**
         * handle changes to the isLimit attr
         * limit true means we need to park the widget and not go beyond the
         * set point, limit false means unpark the widget
         * @param {Event} e YUI event facade
         */
        _afterIsLimitChange: function (e) {
            var CSS = PinAndSlide.CSS_CLASSES,
            el = this.get("contentBox").ancestor("."+CSS.car),
            elHasClass = el.hasClass(CSS.pinned),
            isPinned = this.get("isPinned");

            // if should be pinned and is pinned but at limit, unpin and park
            if (isPinned && elHasClass && e.newVal) {
                el.removeClass(CSS.pinned);
                this._park(el);
            } else if (isPinned && !elHasClass && !e.newVal) {
                // not at limit, should be pinned but has no pin, then pin
                el.addClass(CSS.pinned);
                this._park(el, true);
            }
        },
        /**
         * park the widget at the point of the limitNode
         * @param {Element} el the sliding container of the widget
         * @param {Boolean} undo 'true' if you want to 'unpark' the widget
         */
        _park: function (el, undo) {
            if (undo) {
                el.removeAttribute("style");
            } else {
                var top = (this.get("limitY") - el.getY()) + "px";
                el.setStyles({
                    top: top,
                    position: "absolute"
                });
            }
        },
        /**
         * handle changes to the width attr
         * @param {Event} e YUI event facade
         */
        _afterContainerWidthChange: function (e) {
            this.setContainerWidth(this.get("containerWidth"));
        }

    });

    Y.namespace("U1MS").PinAndSlide = PinAndSlide;
