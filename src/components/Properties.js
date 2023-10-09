import React, {useContext, useEffect} from 'react'
import PropertyItem from './PropertyItem'
import PropertyContext from '../context/property/PropertyContext';

export default function Properties() {

    const context = useContext(PropertyContext);
    const { properties, getAllProperties} = context;

    useEffect(() => {
        getAllProperties()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="row my-3">
                <h2>Search Properties for Rent</h2>
                <div className="container mx-2">
                    {properties.length === 0 && 'No Property to display'}
                </div>
                {properties.map((property) => {
                    return <PropertyItem key={property._id} property={property} />
                })}
            </div>
        </>
    )
}
