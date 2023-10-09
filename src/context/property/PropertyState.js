import propertyContext from "./PropertyContext";
import { useState } from "react";

const PropertyState = (props) => {
  const host = "http://localhost:5000"
  const propertyInitial = []
  const [properties, setproperties] = useState(propertyInitial)

  // Get all propertys
  const getAllProperties = async () => {
    // API Call 
    const response = await fetch(`${host}/api/property/fetchallproperties`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json() 
    setproperties(json)
  }

  const getPropertiesByUser = async () => {
    // API Call 
    const token = localStorage.getItem('token');
    const response = await fetch(`${host}/api/property/fetchpropertiesbyuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    });
    const json = await response.json() 
    setproperties(json)
  }

  // Add a property
  const addproperty = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/property/addproperty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      },
      body: JSON.stringify({title, description, tag})
    });

    const property = await response.json();
    setproperties(property.concat(property))
  }

  // Delete a property
  const deleteproperty = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/property/deleteproperty/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      }
    });
    const json = response.json(); 
    console.log(json);

    const newproperties = properties.filter((property) => { return property._id !== id })
    setproperties(newproperties)
  }

  // Edit a property
  const editproperty = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/property/updateproperty/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 
    console.log(json);

     let newproperties = JSON.parse(JSON.stringify(properties))
    // Logic to edit in client
    for (let index = 0; index < newproperties.length; index++) {
      const element = newproperties[index];
      if (element._id === id) {
        newproperties[index].title = title;
        newproperties[index].description = description;
        newproperties[index].tag = tag; 
        break; 
      }
    }  
    setproperties(newproperties);
  }

  return (
    <propertyContext.Provider value={{ properties, addproperty, deleteproperty, editproperty, getAllProperties, getPropertiesByUser }}>
      {props.children}
    </propertyContext.Provider>
  )

}
export default PropertyState;