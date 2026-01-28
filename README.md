# [Z] App (template)
*Working template for URL encoded app*

<!-- TODO: 1. rename app (and tool URL) -->

> Part of the [Z-Apps](https://github.com/fortuna-events/z-app)

### [Tool link](https://fortuna-events.github.io/z-app/)

## Data format

<!-- TODO: 3. change data format -->

Format is made line by line

Header (1-2 line):
```txt
1    Title and description (html, <h1> on plain text)
2?   Hue, Saturation (optional, "180, 30%" by default)
```

After that each link is defined as follows:
```txt
1    Data (html)
```

## Samples

<!-- TODO: 4. change sample -->

[Sample](https://fortuna-events.github.io/z-app/?z=AARDdPWDAjZNDFQkOAogtlABzB42NXAcGATucbREAeBYGgcWAABdl5z6OpNKE1gCCTlB94kPNYEECgGjAKbpHow1DAKPuKMdXJB4DwSAeAgCwXHz0WAlLAx0BghARSZCwegxgdgpABgNwJoK)

```txt
Url encoded app template
<i>Italic text</i>
<b>Bold text</b>
<pre>code text</pre>
<a href="https://google.com">link</a>
```

## Use this template

<!-- TODO: 6. remove this part -->

```bash
git clone git@github.com/fortuna-events/z-app.git {PROJECT}
cd {PROJECT}
git remote rename origin template
git remote add origin {PROJECT REMOTE}
# everytime you want to update your fork
git fetch --all
git merge template/master
```

> Every task is indicated with a TODO

1. [ ] Rename app in [README.md](./README.md), [index.html](./index.html) and [package.json](./package.json)
2. [ ] Change app hue and saturation in [constants.ts](./src/constants.ts)
3. [ ] Change data format in [README.md](./README.md) and [constants.ts](./src/constants.ts)
4. [ ] Change sample in [README.md](./README.md) and [constants.ts](./src/constants.ts)
5. [ ] Implement your custom logic in [interfaces.ts](./src/interfaces.ts), [constants.ts](./src/constants.ts), [App.vue](./src/App.vue) and [parser.ts](./src/lib/parser.ts)
6. [ ] Remove this part and all TODO

### Upgrade from version 1

```bash
git remote add template git@github.com:fortuna-events/z-app.git
git fetch --all
git checkout -b v1 origin/master
git branch -D master
git checkout -b master template/master
bun install
# re-code logic by checking online code
git push origin master --force
```

## Apps using this template

<!-- TODO: 6. remove this part -->

* [Z-App](https://github.com/fortuna-events/z-app)
* [Treasure-Finder](https://github.com/fortuna-events/z-treasure-finder)
* [On-The-Quizz](https://github.com/fortuna-events/z-on-the-quizz)
* [Cross-Roads](https://github.com/fortuna-events/z-cross-roads)
* [Dice-Roller](https://github.com/fortuna-events/z-dice-roller)
* [Hero-Quest](https://github.com/fortuna-events/z-hero-quest)

## Tips

* [Material design colors](https://materialui.co/colors/) are available, you can use `class="red-500"` on your HTML
* [Lucide icons](https://lucide.dev/icons) are available, you can use `<i icon=house></i>` on your HTML
