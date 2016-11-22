# jQuery Favorite Widget
Provides an widget for adding or removing selected content from favorites that
is stored in cookies.

# Usage

## Basic usage

```
$('#fav').favoriteWidget({id: 'http://www.example.com/articleX'});
```

Given we have ``<div id="fav"></div>`` and given content isn't in favorites,
following initialization would become:
```
<div id="fav" class="favoritewidget favoritewidget--addfav"><span><a href="#">Add to favorites</a></span></div>
```

When clicking "Add to favorites" the element class would change to
"favoritewidget--delfav":
```
<div id="fav" class="favoritewidget favoritewidget--delfav"><span><a href="#">Remove favorites</a></span></div>
```

## Options
```
$('#fav').favoriteWidget({
  id: 'http://www.example.com/articleX',
  cookieName: 'favoritewidget',
  addToFavLabel: 'Add to favorites',
  delFromFavLabel: 'Remove from favorites',
  wrapperClassName: 'favoritewidget',
  addClassName: 'favoritewidget--addfav',
  delClassName: 'favoritewidget--delfav'
});
```

# License
This project is dual licensed with [MIT or GPL v3](LICENSE).
