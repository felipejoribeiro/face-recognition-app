const particle_options = {
	"particles": {
		"links": {
			"color": {
				"value": "#ffffff"
			},
			"distance": 100,
			"opacity": 0.4,
			"width": 1
		},
		"fullScreen": {
			zIndex:2
		},
		"move": {
			"attract": {
			"rotate": {
				"x": 600,
				"y": 100
				}
			},
			"direction": "bottom",
			"enable": true,
			"outModes": {
				"bottom": "out",
				"left": "out",
				"right": "out",
				"top": "out"
			}
		},
		"opacity": {
			"random": {
				"enable": true
			},
			"value": {
				"min": 0.1,
				"max": 0.2
			},
			"animation": {
				"speed": 0.5,
				"minimumValue": 0.1
			}
		},
		"size": {
			"random": {
				"enable": true
			},
			"value": {
				"min": 1,
				"max": 10
			},
			"animation": {
				"speed": 20,
				"minimumValue": 0.1
			}
		}
	}
}

export default particle_options;
