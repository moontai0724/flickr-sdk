## [1.1.3](https://github.com/moontai0724/flickr-sdk/compare/v1.1.2...v1.1.3) (2024-08-09)


### Bug Fixes

* **photoset.reorderPhotos:** adjust type to undocumented api changes ([1ebe0e0](https://github.com/moontai0724/flickr-sdk/commit/1ebe0e087b986a91957540fff5c26390755a2d98))
* type strong for upload.replace async param ([5951860](https://github.com/moontai0724/flickr-sdk/commit/59518607ef05de9d0432c6024cfb18361ff59dee))

## [1.1.2](https://github.com/moontai0724/flickr-sdk/compare/v1.1.1...v1.1.2) (2024-08-01)


### Bug Fixes

* compatible for esm + commonjs ([c660f09](https://github.com/moontai0724/flickr-sdk/commit/c660f0952b796ca193f222e312fe7f0f7b4a0b08))

## [1.1.1](https://github.com/moontai0724/flickr-sdk/compare/v1.1.0...v1.1.1) (2024-08-01)


### Bug Fixes

* expose es module ([4e80496](https://github.com/moontai0724/flickr-sdk/commit/4e80496f9140aab6b99c929f43ff0fd1be62d69f))

# [1.1.0](https://github.com/moontai0724/flickr-sdk/compare/v1.0.0...v1.1.0) (2024-07-31)


### Bug Fixes

* **photosets.create:** use correct http method ([dfce8c5](https://github.com/moontai0724/flickr-sdk/commit/dfce8c57e3e89f269bcf05b976dfcd036745e64d))
* **photosets.getList:** correct response type ([cb12d94](https://github.com/moontai0724/flickr-sdk/commit/cb12d94d3ef6088c0f5e40c68c6b3bdcb81c999d))


### Features

* **photosets.addPhoto:** implement apis ([89b528b](https://github.com/moontai0724/flickr-sdk/commit/89b528b1368bd152caa0092c67a87e9dba6735ec))
* **photosets.create:** implement apis ([87bbdb1](https://github.com/moontai0724/flickr-sdk/commit/87bbdb1fca890867f606e30ba057a27563a3b72d))
* **photosets.delete:** implement apis ([44fa8ed](https://github.com/moontai0724/flickr-sdk/commit/44fa8ed6b9db6be85ed4e71fb18426fa4b096e69))
* **photosets.editMeta:** implement apis ([0a4f1a2](https://github.com/moontai0724/flickr-sdk/commit/0a4f1a24cd71f8869f39c49b97196192c210a50b))
* **photosets.editPhotos:** implement apis ([3db23bf](https://github.com/moontai0724/flickr-sdk/commit/3db23bf9804ca1fa002bfa1b43863571dae7a885))
* **photosets.getContext:** implement apis ([f305ed0](https://github.com/moontai0724/flickr-sdk/commit/f305ed006b174b2b72f6656f1c36857fa8faf5ce))
* **photosets.getPhotos:** implement api and refactor used types ([420ff28](https://github.com/moontai0724/flickr-sdk/commit/420ff28f640c4570ed614d5ca1865acd68db3786))
* **photosets.orderSets:** implement api ([1090184](https://github.com/moontai0724/flickr-sdk/commit/109018496b59ce6f35b59f1d3b384f2577b2bd10))
* **photosets.removePhoto:** implement api and tests ([bcd06b3](https://github.com/moontai0724/flickr-sdk/commit/bcd06b36fe34592838e9dfa12239f5794587328a))
* **photosets.removePhotos:** implement api and tests ([e368e76](https://github.com/moontai0724/flickr-sdk/commit/e368e76513170567ce1dd68a5bcfcedf3d4f111b))
* **photosets.reorderPhotos:** implement api and tests ([f7d84c4](https://github.com/moontai0724/flickr-sdk/commit/f7d84c4c638991b681ffb8a10c499220ce234c67))
* **photosets.setPrimaryPhoto:** implement api and tests ([dbdcbb9](https://github.com/moontai0724/flickr-sdk/commit/dbdcbb98ae6e7954b2d70d0506bbf9fb7b60ff2b))

# 1.0.0 (2024-07-25)


### Bug Fixes

* **apis:** parse ticketId in response of upload ([57a148f](https://github.com/moontai0724/flickr-sdk/commit/57a148fd27807d89ad39e8098424e92e4fb467f1))
* **oauth:** enable params constructor to be able to pass all type of values ([ef41583](https://github.com/moontai0724/flickr-sdk/commit/ef4158336107fe8a4b8f2bb7608dc6e2124d6194))
* **type:** prevent using unexported types ([93addda](https://github.com/moontai0724/flickr-sdk/commit/93adddae0ee6aa08c0bba9980d696d1759f26e76))
* **utils:** handle non-json error case in response handler ([f4cc5c3](https://github.com/moontai0724/flickr-sdk/commit/f4cc5c34f067d5b855fc99fd37fb64a2e2c32e91))
* **utils:** handle null case in camelCase ([8399105](https://github.com/moontai0724/flickr-sdk/commit/83991052775ad654a18678aa861098bdc5a506ae))
* **utils:** proper implement encode of params ([dd12054](https://github.com/moontai0724/flickr-sdk/commit/dd1205440e9b1b1534404e09470478b8e87355da))


### Features

* **apis:** async upload ([bd41572](https://github.com/moontai0724/flickr-sdk/commit/bd4157241f37130ee4d1eb48ca84275c6c7b193e))
* **apis:** oauth related apis ([197a0cc](https://github.com/moontai0724/flickr-sdk/commit/197a0ccab008d1a4b0ece511fcd83b757a3e3785))
* **apis:** photos.delete ([1ae5526](https://github.com/moontai0724/flickr-sdk/commit/1ae55260688a60469b3110bbaaed53d218e9ca72))
* **apis:** photos.getInfo and related base ([e885876](https://github.com/moontai0724/flickr-sdk/commit/e885876ce5856c884f37dedbb7e6482f601c7153))
* **apis:** photos.getSizes ([38b9af8](https://github.com/moontai0724/flickr-sdk/commit/38b9af864b844237cfe07e9f3693be98f4f8ef02))
* **apis:** photos.setMeta ([34f15e5](https://github.com/moontai0724/flickr-sdk/commit/34f15e59334132e78a7dcbb90bc9e4128b198047))
* **apis:** photos.upload.checkTickets ([7d49ee7](https://github.com/moontai0724/flickr-sdk/commit/7d49ee73b3423ee3dc46fa1075863a717776346a))
* **apis:** photosets.getInfo ([bcdf237](https://github.com/moontai0724/flickr-sdk/commit/bcdf23741f97493d4269d88c8a8b426ead407839))
* **apis:** photosets.getList and related base ([682651d](https://github.com/moontai0724/flickr-sdk/commit/682651d40c9b88fc46b8637f955e656f3bc1b9ae))
* **apis:** replace file ([8a019e8](https://github.com/moontai0724/flickr-sdk/commit/8a019e8e83c9a817447de1f0d3d40ecab2f953b4))
* **apis:** upload single file ([a20fbce](https://github.com/moontai0724/flickr-sdk/commit/a20fbce3e22573fcb240314953014fa90941fe92))
* **oauth:** authorize apis with oauth ([6cb9bc6](https://github.com/moontai0724/flickr-sdk/commit/6cb9bc6df276621ef75ea137e2381522bbd32ba8))
* **utils:** as content transformer ([59e2c13](https://github.com/moontai0724/flickr-sdk/commit/59e2c1382fbf87f220679ec17af9019a22e4ac13))
* **utils:** camel case transformer ([261aee4](https://github.com/moontai0724/flickr-sdk/commit/261aee423af1a1be1a4a03b3d326ad601f2a8881))
* **utils:** flickr rest api common request ([fb3adf3](https://github.com/moontai0724/flickr-sdk/commit/fb3adf337ac0ee3d72e27edd9ee079e98111cffa))
