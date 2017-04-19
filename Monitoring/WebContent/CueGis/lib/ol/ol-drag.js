(function(window){
    /**
     * Define a namespace for the application.
     */
    window.ol_drag = {};
    var app = window.ol_drag;
    app._isDragging = false;
    app._coordinates;

    /**
     * @constructor
     * @extends {ol.interaction.Pointer}
     */
    app.Drag = function() {

        ol.interaction.Pointer.call(this, {
            handleDownEvent: app.Drag.prototype.handleDownEvent,
            handleDragEvent: app.Drag.prototype.handleDragEvent,
            handleMoveEvent: app.Drag.prototype.handleMoveEvent,
            handleUpEvent: app.Drag.prototype.handleUpEvent
        });

        /**
         * @type {ol.Pixel}
         * @private
         */
        this.coordinate_ = null;

        /**
         * @type {string|undefined}
         * @private
         */
        this.cursor_ = 'pointer';

        /**
         * @type {ol.Feature}
         * @private
         */
        this.feature_ = null;

        /**
         * @type {string|undefined}
         * @private
         */
        this.previousCursor_ = undefined;

    };
    ol.inherits(app.Drag, ol.interaction.Pointer);


    /**
     * @param {ol.MapBrowserEvent} evt Map browser event.
     * @return {boolean} `true` to start the drag sequence if `draggable` property of feature is true, 
     * else `false` is returned.
     */
    app.Drag.prototype.handleDownEvent = function(evt) {
        var map = evt.map;
        var _this = this;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
                function(feature, layer) {
            return _this._checkHandling(feature);
        });

        if (feature) {
            this.coordinate_ = evt.coordinate;
            this.feature_ = feature;
        }
        return !!feature;
    };


    /**
     * @param {ol.MapBrowserEvent} evt Map browser event.
     */
    app.Drag.prototype.handleDragEvent = function(evt) {
        var map = evt.map;
        var _this = this;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
                function(feature, layer) {
            return _this._checkHandling(feature);        
        });

        var deltaX = evt.coordinate[0] - this.coordinate_[0];
        var deltaY = evt.coordinate[1] - this.coordinate_[1];

        var geometry = /** @type {ol.geom.SimpleGeometry} */
            (this.feature_.getGeometry());	
        geometry.translate(deltaX, deltaY);

        try {
            this._coordinates = geometry.getCoordinates ? geometry.getCoordinates() : undefined;
        } catch(e) {
        }
        this._isDragging = true;
        this.coordinate_[0] = evt.coordinate[0];
        this.coordinate_[1] = evt.coordinate[1];        
    };


    /**
     * @param {ol.MapBrowserEvent} evt Event.
     */
    app.Drag.prototype.handleMoveEvent = function(evt) {
        if (this.cursor_) {
            var map = evt.map;
			if(map._cueGisDragging == true) {				
				return;
			}
            var _this = this;
            var feature = map.forEachFeatureAtPixel(evt.pixel,
                    function(feature, layer) {
                // return _this._checkHandling(feature);
                return feature;
            });
            var element = evt.map.getTargetElement();
            if (feature) {
                if (element.style.cursor != this.cursor_) {
                    this.previousCursor_ = element.style.cursor;
                    element.style.cursor = this.cursor_;
                }
            } else if (this.previousCursor_ !== undefined) {
                element.style.cursor = this.previousCursor_;
                this.previousCursor_ = undefined;
            }
        }
    };


    /**
     * @param {ol.MapBrowserEvent} evt Map browser event.
     * @return {boolean} `false` to stop the drag sequence.
     */
    app.Drag.prototype.handleUpEvent = function(evt) { 

        var _this = this;
        if(this._isDragging) {
            var features = this.feature_.get("features");
            if(features != undefined) {               
                if(_this._coordinates) {
                    // For Repositioning POI inside cluster after dragging
                    features[0].getGeometry().setCoordinates(_this._coordinates);			
                }			
            }
            this._isDragging = false;
        }   
        this.coordinate_ = null;
        this.feature_ = null;
        return false;
    };

    /**
     * Check whether the feature is eligible for drag handling
     */
    app.Drag.prototype._checkHandling = function(feature) {
        var features = feature.get("features");
        if(features == undefined) {
            if(feature.draggable == false) {
                return false;
            }
            return feature;
        }
        if(features[0].draggable == true) {
            return feature;
        }   
    }
})(this);