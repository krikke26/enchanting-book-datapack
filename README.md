
This datapack for minecraft allows you to craft enchanting books or create villagers with enchanting book trades

# Installation & how to use
Head over to <a href="https://krikke26.github.io/enchanting-book-datapack/">krikke26.github.io/enchanting-book-datapack/</a>

# For developers

### Generate books

Run:
```text
yarn build
```

### Changelog

- 2.0.0 - Add villager trading for all enchant books (added functions to create specific villagers). Completely removed the old crafting method
- 0.1.4 - fix curse of vanishing and depth strider books by using new ingredients, Tested in 1.17
- 0.1.3 - fix typo for Loyalty books. Decrease required items for curse of binding, curse of vanishing & Unbreaking
- 0.1.2 - Fixed the datapack zip problem. The datapack no longer needs to be unzipped to work, Update silk touch recipe
- 0.1.1 - Added the new 1.16 books Multishot, Quick charge, Piercing
- 0.0.4 - updated some book ingredients and update the docs at https://krike.github.io/enchanting-book-datapack/﻿

### TODO:

Datapack:
[ ] Update github main page

Project:
[x] Move to yarn 2
[x] rename datapacks folder to dist
[ ] refactor src folder structure
[ ] Based on the types of villagers, loop through the books and create summon functions
[ ] add option to enable disable the gameloop check for crafting enchant books (disabled by default)
[ ] add proper versioning for different minecraft version starting from 1.16
[ ] Update the documentation page to show the 2 options (on top visual buttons with grayscale disabled state)

Docs:
[ ] create new image visual
(left the crafting option visual where you see item dropped and bouncing arrow to a book, on the right side the
villager trading with screenshot of the trades in a speaking bubble in minecraft design)
[ ] Create a visual explanation for the description instead of just text
