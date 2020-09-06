[![npm](https://img.shields.io/npm/v/use-tweaks?style=flat-square)](https://www.npmjs.com/package/use-r3f-assets) ![npm](https://img.shields.io/npm/dt/use-r3f-assets.svg?style=flat-square) [![Discord Shield](https://discordapp.com/api/guilds/740090768164651008/widget.png?style=shield)](https://discord.gg/ZZjjNvJ)
# 🧰 use-r3f-assets

A set of hooks for quick prototyping in [react-three-fiber](https://github.com/react-spring/react-three-fiber).

```bash
yarn add drei use-r3f-assets
```

## How it works

The assets are hosted on github and served using [githack.com](https://raw.githack.com/). When you are ready to go live, remember to donwload the assets and host them yourself!

#### `useNormalTexture`

Loads normal textures from this repository: https://github.com/emmelleppi/normal-maps


```jsx
const [normalMap, url] = useNormalTexture(
  1, // index of the normal texture - https://github.com/emmelleppi/normal-maps/blob/master/normals.json
  // second argument is texture attributes 
  { 
    offset: [0, 0], 
    repeat: [normRepeat, normRepeat], 
    anisotropy: 8
  }
)

return (
  ...
  <meshStandardMaterial normalMap={normalMap} />
  ...
)

 ```
 
 👉 Use the `url` to download the texture when you are ready for production!
 
 
 #### `useMatcapTexture`
 
 Loads matcap textures from this repository: https://github.com/emmelleppi/matcaps
 
 ```jsx
const [matcap, url] = useMatcapTexture(
  0, // index of the matcap texture https://github.com/emmelleppi/matcaps/blob/master/matcap-list.json
  1024 // size of the texture ( 64, 128, 256, 512, 1024 ) 
)

return (
  ...
  <meshMatcapMaterial matcap={matcap} />
  ...
)
 ```
 
  👉 Use the `url` to download the texture when you are ready for production!

