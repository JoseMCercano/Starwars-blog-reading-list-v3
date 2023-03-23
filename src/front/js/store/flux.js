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

      character: [],
      characterDetail: {},
      characterId: null,
	    planet: [],
	    planetDetail: {},
	    planetId: null,
	    vehicle: [],
	    vehicleDetail: {},
	    vehicleId: null,
      
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
        // const store = getStore();
        // fetch("https://www.swapi.tech/api/vehicles/", {
        // 	method: "GET",
        // 	headers: { "Content-Type": "application/json" },
        // })
        // 	.then((resp) => {
        // 		return resp.json();
        // 	})
        // 	.then(data => {
        // 		let dataGathered = data.results.map((item,index) => {
        // 			return {...item,index:index,type:"vehicles",favorite:false};
        // 		});

        // 		setStore({vehicles : dataGathered});
        // 	})
      },

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

        // const store = getStore();
        // fetch("https://www.swapi.tech/api/planets/", {
        // 	method: "GET",
        // 	headers: { "Content-Type": "application/json" },
        // })
        // 	.then((resp) => {
        // 		return resp.json();
        // 	})
        // 	.then(data => {
        // 		let dataGathered = data.results.map((item,index) => {
        // 			return {...item,index:index,type:"planets",favorite:false};
        // 		});

        // 		setStore({planets : dataGathered});
        // 	})
      },

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

      // addToFavorites: (uid, url, name, type, index) => {
      //   const store = getStore();

      //   if (type == "people") {
      //     store.people[index].favorite = true;
      //   }
      //   if (type == "vehicles") {
      //     store.vehicles[index].favorite = true;
      //   }
      //   if (type == "planets") {
      //     store.planets[index].favorite = true;
      //   }
      //   let temp = store.favorites;

      //   temp.push({
      //     index: index,
      //     uid: uid,
      //     url: url,
      //     name: name,
      //     type: type,
      //     favorite: true,
      //   });

      //   const names = temp.map((o) => o.name);
      //   const filtered = temp.filter(
      //     ({ name }, index) => !names.includes(name, index + 1)
      //   );

      //   setStore({ favorites: filtered });
      // },

      // removeFromFavorites: (i) => {
      //   const store = getStore();

      //   if (i.type == "people") {
      //     store.people[i.index].favorite = false;
      //   }
      //   if (i.type == "vehicles") {
      //     store.vehicles[i.index].favorite = false;
      //   }
      //   if (i.type == "planets") {
      //     store.planets[i.index].favorite = false;
      //   }

      //   let temp = store.favorites;

      //   let testeVar = temp.filter((objecto) => {
      //     return objecto !== i;
      //   });

      //   setStore({ favorites: testeVar });
      // },


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
      

//------------------------------------------------------------------------------------------------
//											 GET USERS
//------------------------------------------------------------------------------------------------

      userProfile: async () => {
        // looks for a token
        const userToken = localStorage.getItem("token");
        try {
          const response = await axios.get(
            process.env.BACKEND_URL + "/api/profile",
            {
              headers: {
                Authorization: "Bearer " + userToken,
              },
            }
          );
          // console.log(data)
          setStore({
            profile: response.data.user,
          });
          // console.log(response.data);
          return true;
        } catch (error) {
          // console.log(error);
          if (error.code === "ERR_BAD_REQUEST") {
            // console.log(error.response.data.msg);
            return;
          }
        }
      },

//-----------------------------------------------------------------------------------------------------
//											PUT UPDATE USERS
//----------------------------------------------------------------------------------------------------

      updateUser: async (password, name, lastname, country) => {
        // bring user data by id
        let store = getStore();
        let user_id = store.userId;
        try {
          const response = await axios.put(
            process.env.BACKEND_URL + "/api/user/" + user_id,
            {
              //   email: email,
              //   username: username,
              password: password,
              name: name,
              lastname: lastname,
              country: country,
            }
          );
          // Sweet alert
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(response);
        } catch (error) {
          // Error codes
          // console.log(error);
          if (error.response.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
          if (error.response.status === 409) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
        }
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

//-----------------------------------------------------------------------------------------------------
//											 PASSWORD CHANGE POST
//-----------------------------------------------------------------------------------------------------

      changePassword: async (email) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/user/password",
            {
              email: email,
            }
          );
          if (response.status === 200) {
            swal("Your password has been sent to your email");
          }
        } catch (error) {
          if (error.response.data.msg === "User email doesn't exist") {
            swal("Your email does not exist");
          }
        }
      },

//---------------------------------------------------------------------------------------------------
//											USER DELETE
//---------------------------------------------------------------------------------------------------

      deleteAccount: async () => {
        let store = getStore();
        let user_id = store.userId;
        try {
          const response = await axios.delete(
            process.env.BACKEND_URL + "/api/user/" + user_id,
            {}
          );
          console.log(response.data.msg);

          if (response.status === 200) {
            setStore({
              auth: false,
            });
            return response;
          }
        } catch (error) {
          console.log(error);
          if (error.response.status === 404) {
            Swal.fire(error.response.msg);
          }
        }
      },

//---------------------------------------------------------------------------------------------------------------
//											 GET CHARACTERS
//--------------------------------------------------------------------------------------------------------------

      getCharacters: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/home-internal/characters"
          );

          const data = await response.json();
          setStore({
            character: data,
          });
        } catch (err) {
          console.log(err);
        }
      },

//-------------------------------------------------------------------------------------------------------------
//											 GET CHARACTERS DETAILS
//-------------------------------------------------------------------------------------------------------------

      getCharactersDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/home-internal/characters/" + id
          );

          const data = await response.json();
          // console.log(data);
          setStore({
            characterDetail: data,
            characterId: data.id,
          });
          // console.log(store.characterDetail);
          // console.log(store.characterId);
          return store.characterId;
        } catch (err) {
          console.log(err);
        }
      },

//--------------------------------------------------------------------------------------------------------------
//											 GET PLANETS
//--------------------------------------------------------------------------------------------------------------

      getPlanetsInt: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/home-internal/planets"
          );
          const data = await response.json();

          setStore({
            planet: data,
          });
        } catch (err) {
          console.log(err);
        }
      },

//---------------------------------------------------------------------------------------------------------------
//											 GET PLANETS DETAILS
//---------------------------------------------------------------------------------------------------------------

      getPlanetsDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/home-internal/planets/" + id
          );

          const data = await response.json();
          // console.log(data);
          setStore({
            planetDetail: data,
            planetId: data.id,
          });
          // console.log(store.planetDetail);
          // console.log(store.planetId);
          return store.planetId;
        } catch (err) {
          console.log(err);
        }
      },

//--------------------------------------------------------------------------------------------------------------
//											 GET VEHICLES
//--------------------------------------------------------------------------------------------------------------

      getVehiclesInt: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/home-internal/vehicles"
          );
          const data = await response.json();

          setStore({
            vehicle: data,
          });
        } catch (err) {
          console.log(err);
        }
      },

//-------------------------------------------------------------------------------------------------------------
//											 GET VEHICLES DETAILS
//-------------------------------------------------------------------------------------------------------------

      getVehiclesDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/home-internal/vehicles/" + id
          );

          const data = await response.json();
          // console.log(data);
          setStore({
            vehicleDetail: data,
            vehicleId: data.id,
          });
          // console.log(store.vehicleDetail);
          // console.log(store.vehicleId);
          return store.vehicleId;
        } catch (err) {
          console.log(err);
        }
      },

		}
	};
};

export default getState;
