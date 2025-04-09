// import React from "react";
import getMeta from "../../helpers/getMeta";

interface Props {
  result: {
    listMetadata: {
      assetId: string[];
      d: string[];
      c: string[];
      imageAlt?: string[];
      animalType: string[];
      locationFound: string[];
      imageUrl: string[];
    };
    liveUrl: string;
    title: string;
  };
}

const Result = ({ result }: Props) => {
  return (
    <li key={getMeta(result, "assetId")}>
      <div>
        <h3>Title: {getMeta(result, "c")}</h3>
        <p>Description: {getMeta(result, "d")}</p>
        <p>Animal Type: {getMeta(result, "animalType")}</p>
        <p>Location Found: {getMeta(result, "locationFound")}</p>
        <img
          src={getMeta(result, "imageUrl")}
          alt={getMeta(result, "imageAlt")}
        />
      </div>
    </li>
  );
};

export default Result;
