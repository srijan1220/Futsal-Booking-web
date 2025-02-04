import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import { fetchSingleBloodBankApi } from "../../../apis/api";

const SingleBloodbank = () => {
  const { id } = useParams();
  const [bloodbank, setBloodbank] = useState("");

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
                className=""
                center={[bloodbank.latitude, bloodbank.longitude]}
                zoom={25}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[bloodbank.latitude, bloodbank.longitude]}>
                  <Popup>
                    <div>
                      <h3>{bloodbank.bloodbankName}</h3>
                      <p>{bloodbank.bloodbankAddress}</p>
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