import React from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="text-center mt-5">
      <div id="body">
        <h1>Think before throwing away</h1>
        <h2>
          Sustainability made simple. The platform that unites industry and
          innovation in the framework of the bioeconomy towards a circular
          economic model.
        </h2>
        <p>
          We are a platform whose aim is to connect, on one hand, companies
          which generate waste with the potential to be reusable, and on the
          other hand, companies that use this waste to produce their own
          product, thus returning it to the value chain. Our aim is to encourage
          the implementation of initiatives which give a second life to products
          that are discarded by other companies, thus generating benefits for
          both parties. It is very common that companies which are developing a
          product following the principles of circular economy do not have the
          knowledge of where to find the by-products they need. We aim to be
          that platform that centralizes all the information,serves as a link
          between companies and innovators, and not only this, but we also want
          to serve as a platform for inspiration, advice and transport. Here you
          can find ideas, reports, support and much more.
        </p>
        <p></p>
        <p>
          Through this initiative we hope to contribute to a change in the
          economic and social model, because without this platform of
          centralisation and union, many opportunities for cooperation are being
          lost. Ideas are not lacking, but action is, and now is the time.
        </p>
      </div>
      <p>Do you want to see the by-products available?</p>
      <Link to="/prod_list">
        <button className="btn btn-primary">See by-products</button>
      </Link>
      <p></p>
      <p>Interested in joining Thinkay?</p>
      <Link to="/signup">
        <button className="btn btn-primary">Sign up</button>
      </Link>
      <p></p>
      <p>Need inspiration? Check out our Blog to get inspired!</p>
      <Link to="/blog">
        <button className="btn btn-primary">Blog</button>
      </Link>
    </div>
  );
};
