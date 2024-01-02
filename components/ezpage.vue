<template>
	<view class="root-container">
		<view class="top-nav top-nav1" :style="{height:statusBarHeight+'px'}"></view>
		<view v-if="showNavigation" class="top-nav top-nav1" :style="{paddingTop:statusBarHeight+'px'}">
			<slot name="navigationSection">
				<eznavigationbar>
					<text slot='title'>{{title}}</text>
				</eznavigationbar>
			</slot>
		</view>
		<view style="width:100%;height: 100%;position: relative;" :style="{paddingTop:paddingTop+'px',paddingBottom:paddingBottom+'px'}">
			<slot name="contentSection"></slot>
		</view>
		<view style="width:100%;position: fixed;z-index: 998;bottom: 0;">
			<slot name="tabSection"></slot>
		</view>
	</view>
</template>

<script>
	import eznavigationbar from "./eznaviagtionbar.vue"
	
	var sysInfo;
	export default {
		components:{
			eznavigationbar
		},
		data() {
			return {
				paddingTop:0,
				paddingBottom:0,
				statusBarHeight:22,
			};
		},
		props:{
			title:{
				type:String,
				default:""
			},
			showNavigation:{
				type:Boolean,
				default:true
			},
			immersionNavigation:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			
		},
		methods:{
			autoPaddingTop:function(){
				if(this.immersionNavigation)return 0;
				if(this.showNavigation)return 44+sysInfo.statusBarHeight;
				return sysInfo.statusBarHeight;
			},
			autoPaddingBottom:function(){
				if(this.$slots.tabSection)return 50+(sysInfo.safeArea.top!=20?34:0);
				return 0;
			}
		},
		mounted() {
			sysInfo=uni.getSystemInfoSync();
			
			this.paddingTop=this.autoPaddingTop();
			this.paddingBottom=this.autoPaddingBottom();
			// this.contentHeight=(this.sysInfo.screenHeight-this.paddingTop-this.paddingBottom)+"px";
			this.statusBarHeight=sysInfo.statusBarHeight;
		}
	}
</script>

<style lang="scss" scoped>
	$bg: #202123;
	$textColor: #ffffff;

	.root-container {
		position: relative;
		--bg: $bg;
		--text-color: $textColor;
		color: $textColor;
		min-height: 100%;
	}

	.top-nav {
		width: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		transition: background .4s;
	}
	@media (prefers-color-scheme: dark) {
		.root-container {
			background-color: $bg;
		}
		.top-nav {
			background-color: $bg;
		}
	}

	@media (prefers-color-scheme: light) {
		.root-container {
			background-color: $bg;
		}
		.top-nav {
			background-color: $bg;
		}
	}

	.top-nav1 {
		z-index: 999998;
	}
	.top-nav2 {
		z-index: 999997;
	}
</style>
