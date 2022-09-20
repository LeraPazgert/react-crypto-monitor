import "./CoinDetailsPage.scss";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "../../components/CoinChart/CoinChart";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCoin } from "../../store/actionCreators";
import CoinAdditionModal from "../../components/CoinAdditionModal/CoinAdditionModal";
import { Tooltip } from "@mui/material";

const CoinDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { coin, loading } = useAppSelector((state) => state.coinDetail);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchCoin(id));
    }
  }, [dispatch, id]);

  const activeModal = useCallback(() => {
    setModalActive(true);
  }, [setModalActive]);

  const changePercent24Hr = coin?.changePercent24Hr;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="detail-page">
      <div className="container">
        <div className="info-details detail-page__info">
          <div className="info-details__title">{coin?.name}</div>
          <div className="info-details__wrapper">
            <span className="info-details__param">symbol:</span>
            {coin?.symbol}
          </div>
          <div className="info-details__wrapper">
            <span className="info-details__param">price USD:</span>
            {coin?.priceUsd.slice(0, 8)} $
          </div>
          <div className="info-details__wrapper">
            <span className="info-details__param">supply:</span>{" "}
            {coin?.supply.slice(0, 12)}
          </div>
          <div className="info-details__wrapper">
            <span className="info-details__param">market cap USD:</span>{" "}
            {coin?.marketCapUsd.slice(0, 15)}
          </div>
          <div className="info-details__wrapper">
            change percent 24Hr:
            <span
              style={{
                color:
                  Number(changePercent24Hr) > 0
                    ? "rgb(14, 203, 129)"
                    : "red",
                fontWeight: 500,
                marginLeft: 100,
              }}
            >
              {changePercent24Hr?.slice(0, 5)} %
            </span>{" "}
          </div>
          <Tooltip title='Add to briefcase' arrow>
            <button
              className="info-details__btn"
              onClick={activeModal}
            >
              +
            </button>
          </Tooltip>

        </div>
        <div className="info-details__chart" style={{ width: '100%', height: 500 }} >
          <CoinChart id={coin?.id} />
        </div>
      </div>
      {modalActive && <CoinAdditionModal {...coin} active={modalActive} setActive={setModalActive} />}
    </div>
  );
};

export default CoinDetailsPage;
