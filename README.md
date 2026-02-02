# [Z] App (template)
*Working template for URL encoded app*

> Part of the [Z-Apps](https://github.com/fortuna-events/z-app)

### [Tool link](https://dice.fortuna-events.fr)

## Data format

Format is made line by line

Header (1-2 line):
```txt
1    Title and description (html, <h1> on plain text)
2?   Hue, Saturation (optional, "180, 30%" by default)
```

After that data is defined as follows:
```txt
2   Success message (html, <h2> on plain text)
3   Failure message (html, <h2> on plain text)
4   Dices to roll (as XdY)
5   Minimum score to obtain (0+)
6?  Saved roll expiration in minutes (0+, optional, default to 1440 minutes)
7?  Roll button text (html, optional)
```

## Samples

[Sample 1](https://fortuna-events.github.io/z-app/?z=AowwiNAkjAscRaQMTyVAR1EALRC3TIASigEizw-dEZPkBG9ahtFDMWDIaUjBEiQ8MUYgjnPImAgOAowwgiB7BEieAcBwZAHAUU8IHgXAzAMcCwrxRCRywNAEJA4DgJALA8AgCYKgZcBQAwcgdglgNgRgtwQIO)

```txt
Gambling time
<h2>Have a <a href='https://orteil.dashnet.org/cookieclicker/'>cookie</a> !</h2>
You fail !
2d6
6
```

[Sample 2](https://fortuna-events.github.io/z-app/?z=ACbyt0GAQEdEhFB-4J-YjWww5TioUVXyBgWKJjEZCyXwkhNDMBYLXSLPTX4FZqEzsoA85IEgrAogjAESidHAfMM5HhgZAoQwZAGoYOA-QQBFAEwT41lDryNpXti0rY6BgJ6YDgWA3CTAICgXA7AUMGIWwSAYBzgpArBGCsFEsH4CgAgngTgKAfAjwCwD)

```txt
<h1>Try to make a <i icon="dice-6"></i><i icon="dice-6"></i></h1>
The gods of dice are with you!
Try again in a minute!
2d6
12
1
<i icon='dices'></i><i icon='dices'></i> Try my luck
```

## TODO

* [ ] Better roll animation ?
* [ ] Handle better roll text (2d2 + 1d3 + 1 > 5)

## Tips

* [Material design colors](https://materialui.co/colors/) are available, you can use `class="red-500"` on your HTML
* [Lucide icons](https://lucide.dev/icons) are available, you can use `<i icon=house></i>` on your HTML
* Admonitions can be made with things like `<div class='admonition success'><p class=admonition-title>Title</p><p>Content</p></div>`
* Progress bars can be made with things like `<div class=progress><div class=progress-bar style="width:25%"><p class=progress-label>25%</p></div></div>`
