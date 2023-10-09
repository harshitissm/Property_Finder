const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Property = require('../models/Property');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Properties using: GET "/api/properties/getuser". Login required
router.get('/fetchpropertiesbyuser', fetchuser, async (req, res) => {
    try {
        const properties = await Property.find({ user: req.user.id });
        res.json(properties)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.get('/fetchallproperties', async (req,res) => {
    try {
        const properties = await Property.find({ available: true });
        res.json(properties)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Property using: POST "/api/properties/addproperty". Login required
router.post('/addproperty', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('price', 'Enter Numeric Value Only').isNumeric(),
    body('city', 'City Must not be Blank').isLength({ min: 4}),
    body('state', 'State Must not be Blank').isLength({ min: 4}),
    body('country', 'Country Must not be Blank').isLength({ min: 5}),
    body('bed', 'Enter Numeric Value Only').isNumeric(),
    body('bathroom', 'Enter Numeric Value Only').isNumeric(),], async (req, res) => {
        try {
            const { title, price, city, state, country, bed, bathroom, area, available } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const property = new Property({
                title, price, city, state, country, bed, bathroom, area, available, user: req.user.id
            })
            const savedProperty = await property.save()

            res.json(savedProperty)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Property using: PUT "/api/properties/updateproperty". Login required
router.put('/updateproperty/:id', fetchuser, async (req, res) => {
    const { title, price, city, state, country, bed, bathroom, area, available } = req.body;
    try {
        // Create a newProperty object
        const newProperty = {};
        if (title) { newProperty.title = title };
        if (price) { newProperty.price = price };
        if (city) { newProperty.city = city };
        if (state) {newProperty.state = state};
        if (country) { newProperty.country = country };
        if (bed) { newProperty.bed = bed };
        if (bathroom) { newProperty.bathroom = bathroom };
        if (area) {newProperty.area = area};
        if (available) (newProperty.available = true)
        else (newProperty.available = false);

        // Find the property to be updated and update it
        let property = await Property.findById(req.params.id);
        if (!property) { return res.status(404).send("Not Found") }

        if (property.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        property = await Property.findByIdAndUpdate(req.params.id, { $set: newProperty }, { new: true })
        res.json({ property });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Property using: DELETE "/api/properties/deleteproperty". Login required
router.delete('/deleteproperty/:id', fetchuser, async (req, res) => {
    try {
        // Find the property to be delete and delete it
        let property = await Property.findById(req.params.id);
        if (!property) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Property
        if (property.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        property = await Property.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Property has been deleted", property: property });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router