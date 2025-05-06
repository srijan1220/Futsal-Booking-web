import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useParams } from "react-router-dom";


const SingleBloodbank = () => {
  const { id } = useParams();
  const [bloodbank, setBloodbank] = useState<{
    bbName: string;
    bbAddress: string;
    bbContact: string;
    socialMediaLinks: string;
    operatingHours: string;
    serviceOffered: string;
    specialInstructions: string;
    additionalNotes: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    fetchSingleBloodBankApi(id).then((res) => {
      setBloodbank(res.data.bloodbank);
    });
  }, [id]);

  if (!bloodbank) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="container-fluid p-5 mt-5">
          <div className="row mb-4">
            <div className="col-md-6 p-0">
              <img
                src="https://focuscentralpa.org/wp-content/uploads/2023/02/Evan.jpg"
                className="img-fluid rounded-4 h-100"
                alt="Bloodbank Image"
              />
            </div>
            <div className="col-md-6 p-0">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">{bloodbank.bbName}</h2>
                  <p className="card-text">Address : {bloodbank.bbAddress}</p>
                  <p className="card-text">
                    Contact No. : {bloodbank.bbContact}
                  </p>
                  <p className="card-text">
                    Website :{" "}
                    <a href={bloodbank.socialMediaLinks}>
                      {bloodbank.socialMediaLinks}
                    </a>
                  </p>
                  <p className="card-text">
                    OperatingHours : {bloodbank.operatingHours}
                  </p>
                  <p className="card-text">{bloodbank.serviceOffered}</p>
                  <p className="card-text">{bloodbank.specialInstructions}</p>
                  <p className="card-text">{bloodbank.additionalNotes}</p>
                  <p className="card-text">{bloodbank.additionalNotes}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 p-0">
              <MapContainer
                center={[bloodbank.latitude, bloodbank.longitude] as LatLngExpression}
                zoom={25}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[bloodbank.latitude, bloodbank.longitude]}>
                  <Popup>
                    <div>
                      <h3>{bloodbank.bbName}</h3>
                      <p>{bloodbank.bbAddress}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBloodbank;
function fetchSingleBloodBankApi(id: string | undefined): Promise<{ data: { bloodbank: any } }> {
  // Replace the following mock implementation with your actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          bloodbank: {
            bbName: "Sample Bloodbank",
            bbAddress: "123 Main St",
            bbContact: "123-456-7890",
            socialMediaLinks: "http://example.com",
            operatingHours: "9 AM - 5 PM",
            serviceOffered: "Blood Donation",
            specialInstructions: "Bring ID",
            additionalNotes: "Open on weekends",
            latitude: 27.7172,
            longitude: 85.3240,
          },
        },
      });
    }, 1000);
  });
}

