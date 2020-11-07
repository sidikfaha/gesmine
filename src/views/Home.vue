<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col md="12">
					<v-list rounded>
						<v-subheader>Historique des calculs</v-subheader>
						<v-list-item-group v-model="selectedItem" color="primary">
							<v-list-item v-for="(item, i) in rows" :key="i">
								<v-list-item-icon>
									<v-icon>mdi-history</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title v-text="`Calcul n°${item.id}`"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {ipcRenderer} from "electron"

export default Vue.extend({
  name: "Home",
  components: {},
	data(){
  	return {
  		rows: [],
			selectedItem: 0
		}
	},
	mounted(): void {
  	ipcRenderer.send('get-latest')
		ipcRenderer.on('reply:get-latest', (event, args) => {
			this.rows = args
		})
	}
});
</script>
