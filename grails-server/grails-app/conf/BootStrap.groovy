import cellar.server.Wine

class BootStrap {

    def init = { servletContext ->
		new Wine(
					name: "CHATEAU DE SAINT COSME", 
					year: 2009, 	
					grapes: "Grenache / Syrah", 
					country: "France",
					region: "Southern Rhone",
					description: "The aromas of fruit and spice...",
					picture: "saint_cosme.jpg"
				).save()
		new Wine(
					name: "LAN RIOJA CRIANZA",
					year: "2006",
					grapes: "Tempranillo",
					country: "Spain",
					region: "Rioja",
					description: "A resurgence of interest in boutique vineyards...",
					picture: "lan_rioja.jpg"
				).save()
		new Wine(
					name: "VITICCIO CLASSICO RISERVA",
					year: "2007",
					grapes: "Sangiovese Merlot",
					country: "Italy",
					region: "Tuscany",
					description: "Though soft and rounded in texture, the body of this wine is full and rich and oh-so-appealing. This delivery is even more impressive when one takes note of the tender tannins that leave the taste buds wholly satisfied.",
					picture: "viticcio.jpg"
				).save()
		new Wine(
					name: "CHATEAU LE DOYENNE",
					year: "2005",
					grapes: "Merlot",
					country: "France",
					region: "Bordeaux",
					description: "Though dense and chewy, this wine does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the senses.",
					picture: "le_doyenne.jpg"
				).save()
		new Wine(
					name: "DOMAINE DU BOUSCAT",
					year: "2009",
					grapes: "Merlot",
					country: "France",
					region: "Bordeaux",
					description: "The light golden color of this wine belies the bright flavor it holds. A true summer wine, it begs for a picnic lunch in a sun-soaked vineyard.",
					picture: "bouscat.jpg"
				).save()
		new Wine(
					name: "BODEGA LURTON",
					year: "2011",
					grapes: "Pinot Gris",
					country: "Argentina",
					region: "Mendoza",
					description: "Solid notes of black currant blended with a light citrus make this wine an easy pour for varied palates.",
					picture: "bodega_lurton.jpg"
				).save()
		new Wine(
					name: "MOMO MARLBOROUGH",
					year: "2010",
					grapes: "Sauvignon Blanc",
					country: "New Zealand",
					region: "South Island",
					description: "Best served chilled with melon or a nice salty prosciutto, this sauvignon blanc is a staple in every Italian kitchen, if not on their wine list. Request the best, and you just may get it.",
					picture: "momo.jpg"
				).save()
	
    }
    def destroy = {
    }
}
