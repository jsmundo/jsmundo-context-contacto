

const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		contacts: [],
		demo: [
		  {
			title: "First Element",
			background: "white",
			initial: "white",
		  },
		  {
			title: "Second Element",
			background: "white",
			initial: "white",
		  },
		],
	  },
	  actions: {
		// ... acciones existentes
  
		changeColor: (index, color) => {
		  const store = getStore();
		  const demo = store.demo.map((item, i) => {
			if (i === index) item.background = color;
			return item;
		  });
		  setStore({ demo: demo });
		},
	  },
	};
  };
  
  export default getState;
  

