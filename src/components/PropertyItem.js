import React from 'react'

export default function PropertyItem(props) {

    const { property } = props;

    return (
        <div className='col-md-4'>
            <div className="card my-4">
                <img src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className='mb-2'>
                        <p style={{ margin: "0px" }}>
                            <span style={{ color: "#5f1bf2", fontWeight: "bold", fontSize: "20px" }}>₹ {property.price}</span>
                            /month
                        </p>
                    </div>
                    <h4 className="card-title">{property.title}</h4>
                    <p className="card-text">{property.city}, {property.state}, {property.country}</p> <hr />
                    <ul className="card-list">
                        <li className="list-item">
                            <span>
                                <i className="fa-solid fa-bed"></i>
                                {property.bed === 1 ? ` ${property.bed} bed` : ` ${property.bed} beds`}
                            </span>
                        </li>
                        <li className="list-item">
                            <span>
                                <i className="fa-solid fa-shower"></i>
                                {property.bathroom === 1 ? ` ${property.bathroom} bathroom` : ` ${property.bathroom} bathrooms`}
                            </span>
                        </li>
                        <li className="list-item">
                            <span>
                                <i className="fa-solid fa-house"></i>
                                {` ${property.area}m`}<sup>2</sup>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
