import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import { claim, getProfile, withdraw } from "../service";
import { useLogin } from "../stores";
import { useProfile } from "../stores/userStore";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProfileListGroupBalance from "../components/ProfileListGroupBalance";
import Button from "react-bootstrap/Button";
import { colors } from "../config";
import Countdown from "react-countdown";
import "../components/css/profile.css";
import Loader from "../components/Loader";

const ProfileScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const access = useLogin((state) => state.access);
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const profile = useProfile((state) => state.profile);
  const setProfile = useProfile((state) => state.setProfile);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?redirect=/profile");
    fetchProfile();
    // eslint-disable-next-line
  }, [isLoggedIn, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile(access);
      setLoading(false);
      if (!data.error) {
        setProfile(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profile.id);
    alert("copied");
  };

  const claimHandler = async () => {
    try {
      const data = await claim(access);
      if (data) {
        fetchProfile();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const withdrawHandler = async () => {
    try {
      const data = await withdraw(access);
      if (data) {
        fetchProfile();
      }
    } catch (error) {}
  };
  return loading ? (
    <Loader />
  ) : (
    <Screen>
      <div className=" mt-5 d-flex flex-column flex-md-row justify-content-between align-items-center mb-2">
        <Card className="profile-card">
          <Card.Header className="bg-white">
            <h2 className="text-info ">Claim Now</h2>
          </Card.Header>
          <Card.Body>
            <Button
              onClick={claimHandler}
              size="lg"
              variant="primary"
              className="text-light"
            >
              CLAIM NOW
            </Button>
          </Card.Body>
        </Card>
        <Card className="profile-card">
          <Card.Header className="bg-white">
            <h2 className="text-info ">Next Claim Available In</h2>
          </Card.Header>
          <Card.Body>
            <Button className="text-light" variant="primary" size="lg">
              <Countdown date={profile.claim_datetime} />
            </Button>
          </Card.Body>
        </Card>
      </div>
      <Card className=" w-100 m-auto" style={{ backgroundColor: "white" }}>
        <Card.Body>
          <ListGroup variant="flush" className="w-100 m-auto">
            <ProfileListGroupBalance
              title="Current Balance:"
              value={
                profile.claim_point +
                profile.subset_point -
                profile.total_withdraw
              }
              prefix
            />
            <ProfileListGroupBalance
              title="Total claimed:"
              value={profile.claim_point}
              prefix
            />
            <ProfileListGroupBalance
              title="Total rewards from referrals:"
              value={profile.subset_point}
              prefix
            />
            <ProfileListGroupBalance
              title="Total referrals:"
              value={profile.referrals}
              prefix={false}
            />
            <ProfileListGroupBalance
              title="Total withdrawal:"
              value={profile.total_withdraw}
              prefix={false}
            />
            <ListGroup.Item>
              <p style={{ color: colors.gray }} className="text-center">
                The code below is your referral code,give this to a friend or
                someone you know and earn %30 of their each claim
              </p>
              <div className="d-flex flex-column   justify-content-around align-items-center">
                <p className="text-primary text-center">{profile.id}</p>
                <Button
                  size="sm"
                  variant="dark"
                  onClick={copyToClipboard}
                  className="w-25"
                >
                  copy
                </Button>
              </div>
            </ListGroup.Item>
            <ProfileListGroupBalance
              title="Total referrals:"
              value={profile.referrals}
              prefix={false}
            />
          </ListGroup>
        </Card.Body>
        <Card.Footer className="bg-white text-center">
          <Button className="w-75 text-light" onClick={withdrawHandler}>
            Withdraw
          </Button>
          <p style={{ color: colors.gray }} className="mt-1">
            NOTICE: Withdrawal Can Take Upto 4 Days To Process
          </p>
        </Card.Footer>
      </Card>
    </Screen>
  );
};

export default ProfileScreen;
