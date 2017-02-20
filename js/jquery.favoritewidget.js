/*
 * Copyright 2016, Mikael Kundert @ Wunder
 * Dual licensed under the MIT or GPL Version 3 licenses.
 */

(function($) {

  $.widget("ui.favoriteWidget", {

    /*
     * These are our default options.
     */
    options: {
      id: 0,
      cookieName: 'favoritewidget',
      cookieOptions: {
        expires: 365,
        path: '/'
      },
      addToFavLabel: 'Add to favorites',
      delFromFavLabel: 'Remove from favorites',
      wrapperClassName: 'favoritewidget',
      addClassName: 'favoritewidget--addfav',
      delClassName: 'favoritewidget--delfav',
      delimiter: ',',
      inlineElement: 'button',
      inlineElementClassName: null
    },

    /*
     * Gets called when widget gets created.
     */
    _create: function() {
      this.element.addClass(this.options.wrapperClassName);
      this._update();
    },

    /*
     * Gets called when any options are set.
     */
    _setOption: function(key, value) {
      this.options[key] = value;
      this._update();
      this._super(key, value);
    },

    /*
     * Gets called when widget gets removed.
     */
    _destroy: function() {
      this.element.empty();
      this.element.removeClass(this.options.wrapperClassName);
    },

    /*
     * Private method for checking whether given id is in the favorites.
     */
    _isFavorite: function(id) {
      var favorites = this._getFavorites();
      for (var i=0; i < favorites.length; i++) {
        if (id == favorites[i]) {
          return true;
        }
      }
      return false;
    },

    /*
     * Private method for adding given id to favorites (in to an cookie).
     */
    _addToFavorites: function(id) {
      this._removeFromFavorites(id);
      var values = this._getFavorites();
      values.push(id);
      $.cookie(this.options.cookieName, values.join(this.options.delimiter), this.options.cookieOptions);
    },

    /*
     * Private method for getting favorites from the cookie.
     */
    _getFavorites: function() {
      var strValue = $.cookie(this.options.cookieName);
      if (strValue == undefined) {
        return [];
      }
      else {
        return strValue.split(this.options.delimiter);
      }
    },

    /*
     * Private method for removing given id from a cookie.
     */
    _removeFromFavorites: function(id) {
      var previousFavorites = this._getFavorites();
      var newFavorites = [];
      for (var i=0; i < previousFavorites.length; i++) {
        if (id != previousFavorites[i]) {
          newFavorites.push(previousFavorites[i]);
        }
      }
      $.cookie(this.options.cookieName, newFavorites.join(this.options.delimiter), this.options.cookieOptions);
    },

    /*
     * Private method for updating the widget contents.
     */
    _update: function() {
      // Remove add/delete classes for binded widget
      this.element.removeClass(this.options.addClassName);
      this.element.removeClass(this.options.delClassName);

      // Specify which toggle label and wrapper class we should use
      if (this._isFavorite(this.options.id)) {
        var toggleLabel = this.options.delFromFavLabel;
        var wrapperClassName = this.options.delClassName;
      }
      else {
        var toggleLabel = this.options.addToFavLabel;
        var wrapperClassName = this.options.addClassName;
      }

      // Create given element with text
      var toggle = $('<' + this.options.inlineElement + '></' + this.options.inlineElement + '>');
      toggle.text(toggleLabel);

      // And if class name was given, then use it
      if (this.options.inlineElementClassName != null) {
        // If no class name was given
        toggle.addClass(this.options.inlineElementClassName);
      }

      // And bind an click action
      if (this._isFavorite(this.options.id)) {
        toggle.bind('click', function (e) {
          e.preventDefault();
          $(this).parent().favoriteWidget('favorite', false);
        });
      }
      else {
        toggle.bind('click', function (e) {
          e.preventDefault();
          $(this).parent().favoriteWidget('favorite', true);
        });
      }

      this.element.empty();
      this.element.addClass(wrapperClassName);
      this.element.append(toggle);
    },

    /*
     * Public value callback for favorite option.
     */
    _stateFavorite: null,
    favorite: function(value) {
      // No value passed, act as a getter.
      if (value === undefined) {
        return this._stateFavorite;
      }

      // Value passed, act as a setter
      if (value == true && !this._isFavorite(this.options.id)) {
        // Was added to favorites, add to cookies
        this._addToFavorites(this.options.id);
        this._trigger('addedCallback', null, {id: this.options.id});
      }
      else if (value == false && this._isFavorite(this.options.id)) {
        // Was removed from favorites, remove from cookies
        this._removeFromFavorites(this.options.id);
        this._trigger('removedCallback', null, {id: this.options.id});
      }
      this._stateFavorite = value;
      this._update();
    }

  });
})(jQuery);