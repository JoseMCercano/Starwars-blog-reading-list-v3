import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
      people: [],
      next: "",
      previous: "",
      vehicles: [],
      planets: [],
      person: [],
      singleVehicle: [],
      singlePlanet: [],
      favorites: [],

      admin: false,
      premium: false,
      userId: null,
      auth: false,
      registered: false,
      profile: {},
      
		},
		actions: {

//------------------------------------------------------------------------------------------------------
//											 EXAMPLE FUNCTION
//------------------------------------------------------------------------------------------------------

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

//--------------------------------------------------------------------------------------------
//											EXT API FETCHS
//-------------------------------------------------------------------------------------------


      // this fetch is to get all characters, 10 characters per page, and aloud to go to next and previous pages

      getPeople: (varPag) => {
        const store = getStore();
        let fetchVar = "";

        console.log("varpag", varPag);

        if (varPag == null) {
          fetchVar = "https://www.swapi.tech/api/people/";
        } else {
          fetchVar = varPag;
        }

        fetch(fetchVar, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.results.map((item, index) => {
              return { ...item, index: index, type: "people", favorite: false };
            });
            console.log("is me again ", data);
            setStore({ people: dataGathered });
            setStore({ next: data.next });
            setStore({ previous: data.previous });
          });
      },

      // This fetch get the character details based in uid(unique id)

      getPerson: (uid) => {
        const store = getStore();
        fetch("https://www.swapi.tech/api/people/" + uid, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.result.properties;

            setStore({ person: dataGathered });
          });
      },

      // this fetch is to get all vehicles, 10 vehicles per page, and aloud to go to next and previous pages


      getVehicles: (varPag) => {
        const store = getStore();
        let fetchVar = "";

        console.log("varpag", varPag);

        if (varPag == null) {
          fetchVar = "https://www.swapi.tech/api/vehicles/";
        } else {
          fetchVar = varPag;
        }

        fetch(fetchVar, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.results.map((item, index) => {
              return {
                ...item,
                index: index,
                type: "vehicles",
                favorite: false,
              };
            });
            console.log("from vehicles ", data);
            setStore({ vehicles: dataGathered });
            setStore({ next: data.next });
            setStore({ previous: data.previous });
          });
      },

      // This fetch get the vehicle details based in uid(unique id)

      getSingleVehicle: (uid) => {
        const store = getStore();
        fetch("https://www.swapi.tech/api/vehicles/" + uid, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.result.properties;

            setStore({ singleVehicle: dataGathered });
          });
      },

      // this fetch is to get all planets, 10 vehicles per page, and aloud to go to next and previous pages

      getPlanets: (varPag) => {
        const store = getStore();
        let fetchVar = "";

        if (varPag == null) {
          fetchVar = "https://www.swapi.tech/api/planets/";
        } else {
          fetchVar = varPag;
        }

        fetch(fetchVar, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.results.map((item, index) => {
              return {
                ...item,
                index: index,
                type: "planets",
                favorite: false,
              };
            });
            console.log("from planets ", data);
            setStore({ planets: dataGathered });
            setStore({ next: data.next });
            setStore({ previous: data.previous });
          });
      },

      // This fetch get the planet details based in uid(unique id)

      getSinglePlanet: (uid) => {
        const store = getStore();
        fetch("https://www.swapi.tech/api/planets/" + uid, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            let dataGathered = data.result.properties;

            setStore({ singlePlanet: dataGathered });
          });
      },

      // this add to favorites based in its type

      addToFavorites: (uid, url, name, type, index) => {
        const store = getStore();
        const favoritesIndex = store.favorites.findIndex((f) => f.uid === uid);
        if (favoritesIndex > -1) {
          store.favorites.splice(favoritesIndex, 1);
          if (type === "people") {
            store.people[index].favorite = false;
          } else if (type === "vehicles") {
            store.vehicles[index].favorite = false;
          } else if (type === "planets") {
            store.planets[index].favorite = false;
          }
        } else {
          store.favorites.push({
            index: index,
            uid: uid,
            url: url,
            name: name,
            type: type,
            favorite: true,
          });
          if (type === "people") {
            store.people[index].favorite = true;
          } else if (type === "vehicles") {
            store.vehicles[index].favorite = true;
          } else if (type === "planets") {
            store.planets[index].favorite = true;
          }
        }
        setStore({ favorites: store.favorites });
      },
      
      // delete favorites
      
      removeFromFavorites: (i) => {
        const store = getStore();
        let temp = store.favorites;
      
        // Find the element in the favorites list
        for (let j = 0; j < temp.length; j++) {
          if (temp[j].uid === i.uid && temp[j].type === i.type) {
            // Set its favorite property to false
            if (i.type === "people") {
              store.people[i.index].favorite = false;
            }
            if (i.type === "vehicles") {
              store.vehicles[i.index].favorite = false;
            }
            if (i.type === "planets") {
              store.planets[i.index].favorite = false;
            }
      
            // Remove it from the favorites list
            temp.splice(j, 1);
            break;
          }
        }
      
        setStore({ favorites: temp });
      },
      



//----------------------------------------------------------------------------------------------------
//											 LOGIN POST
//----------------------------------------------------------------------------------------------------

      login: async (email, password) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/login",
            {
              email: email,
              password: password,
            }
          );
          // Sets store with the user id and auth become true to give access
          // conditions to determine the user access level
          // if admin
          if (response.data.user.admin) {
            setStore({
              admin: true,
              auth: true,
              userId: response.data.user.id,
            });
            // if premium user
          } else if (response.data.user.premium) {
            setStore({
              premium: true,
              auth: true,
              userId: response.data.user.id,
            });
            // if standar user
          } else {
            setStore({
              auth: true,
              userId: response.data.user.id,
            });
          }
          // save token in local storage
          localStorage.setItem("token", response.data.msg);

          window.localStorage.setItem("isLoggedIn", true) //-------------------------------------

          return response.data.msg;
        } catch (error) {
          // error codes
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              confirmButtonColor: "#000000",
              text: error.response.data.msg + "... redirecting to signup...",
            });
            return error.response.data.msg;
          } else if (error.response.data.msg === "Bad email or password") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data;
          }
        }
      },

//------------------------------------------------------------------------------------------------------
//											 LOGOUT
//------------------------------------------------------------------------------------------------------

      logout: () => {
        localStorage.removeItem("token");

        window.localStorage.removeItem("isLoggedIn");//-----------------------

        setStore({
          auth: false,
        });
        return false;
      },

//-----------------------------------------------------------------------------------------------------
//											SIGNUP POST
//-----------------------------------------------------------------------------------------------------

      signup: async (username, email, password) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/user",
            {
              username: username,
              email: email,
              password: password,
            }
          );
          if (response.data.msg === "New user created") {
            getActions().login(email, password);

            setStore({
              registered: true,
            });
          }
          return response.data.msg;
        } catch (error) {
          if (error.response.data.msg === "User exists") {
            return error.response.data.msg;
          }
        }
      },

//----------------------------------------------------------------------------------------------------
//											 TOKEN GET
//----------------------------------------------------------------------------------------------------

      validToken: async () => {
        let accessToken = localStorage.getItem("token");
        try {
          const response = await axios.get(
            process.env.BACKEND_URL + "/api/valid-token",
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          );
          if (response.data.user.admin) {
            setStore({
              admin: true,
              auth: true,
              userId: response.data.user.id,
            });
          } else if (response.data.user.premium) {
            setStore({
              premium: true,
              auth: true,
              userId: response.data.user.id,
            });
          } else {
            setStore({
              auth: true,
              userId: response.data.user.id,
            });
          }
          return;
        } catch (error) {
          if (error.code === "ERR_BAD_REQUEST") {
            setStore({
              auth: false,
            });
          }
          return false;
        }
      },

		}
	};
};

export default getState;
