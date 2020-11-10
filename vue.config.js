module.exports = {
  transpileDependencies: ["vuetify"],
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				extraResources: ['db/main.sqlite']
			}
		}
	}
};
