using OpenQA.Selenium.BiDi.Script;
using System;
using System.Collections.Generic;

namespace CarShowroom.DTOs
{
    public class AddListingOnlineDTO
    {
        public AddListingOnlineDTO(
            string make, string model, string year, string price,
            string? mileage, string? description, string? color,
            List<string>? images, string? transmission, string? bodyType,
            string? fuelType, string? location, string? coverImage, string? source)
        {
            Make = make;
            Model = model;
            Year = year;
            Price = price;
            Mileage = mileage;
            Description = description;
            Color = color;
            Images = images;
            Transmission = transmission;
            BodyType = bodyType;
            FuelType = fuelType;
            Location = location;
            CoverImage = coverImage;
            Source = source;
        }

        // Public Properties (Must use { get; } for JSON Serialization)
        public string Make { get; private set; }
        public string Model { get; private set; }
        public string Year { get; private set; }
        public string Price { get; private set; }

        public string? Mileage { get; private set; }
        public string? Description { get; private set; }
        public string? Color { get; private set; }
        public List<string>? Images { get; private set; }
        public string? Transmission { get; private set; }
        public string? BodyType { get; private set; }
        public string? FuelType { get; private set; }
        public string? Location { get; private set; }
        public string? CoverImage { get; private set; }

        public string? Source { get; private set; }

        public class Builder
        {
            private string? _make;
            private string? _model;
            private string? _year;
            private string? _price;
            private string? _mileage;
            private string? _description;
            private string? _color;
            private List<string>? _images;
            private string? _transmission;
            private string? _bodyType;
            private string? _fuelType;
            private string? _location;
            private string? _coverImage;
            private string? _source;

            public Builder SetMake(string make) { _make = make; return this; }
            public Builder SetModel(string model) { _model = model; return this; }
            public Builder SetYear(string year) { _year = year; return this; }
            public Builder SetPrice(string price) { _price = price; return this; }

            public Builder SetMileage(string mileage) { _mileage = mileage; return this; }
            public Builder SetDescription(string description) { _description = description; return this; }
            public Builder SetColor(string color) { _color = color; return this; }
            public Builder SetImages(List<string> images) { _images = images; return this; }
            public Builder SetTransmission(string transmission) { _transmission = transmission; return this; }
            public Builder SetBodyType(string bodyType) { _bodyType = bodyType; return this; }
            public Builder SetFuelType(string fuelType) { _fuelType = fuelType; return this; }
            public Builder SetLocation(string location) { _location = location; return this; }
            public Builder SetCoverImage(string coverImage) { _coverImage = coverImage; return this; }

            public Builder SetSource(string source) { _source = source; return this; }
            public AddListingOnlineDTO Build()
            {
                return new AddListingOnlineDTO(
                    _make ?? throw new ArgumentNullException(nameof(_make), "Make is required"),
                    _model ?? throw new ArgumentNullException(nameof(_model), "Model is required"),
                    _year ?? throw new ArgumentNullException(nameof(_year), "Year is required"),
                    _price ?? throw new ArgumentNullException(nameof(_price), "Price is required"),
                    _mileage,
                    _description,
                    _color,
                    _images,
                    _transmission,
                    _bodyType,
                    _fuelType,
                    _location,
                    _coverImage,
                    _source
                );
            }
        }
    }
}