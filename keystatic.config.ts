import { collections } from "@/fileds"
import { config } from "@keystatic/core";

const isProd = import.meta.env.PROD;

export default config({
	storage: isProd
		? {
				kind: "cloud",
			}
		: {
				kind: "local",
			},
	cloud: {
		project: "aiz-site/internetaddicts",
	},
	collections,
});
