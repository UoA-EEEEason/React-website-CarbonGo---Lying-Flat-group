import { faker } from '@faker-js/faker';
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppNewsUpdate from '../app-news-update';
import AppCurrentSubject from '../app-current-subject';
import {
  getTotalConsumption,
  getTotalUsers,
  getTotalTreesPlanted,
  getTotalNewsPosted,
  getTotalMessagePosted,
  getWalkConsumption,
  getTrafficConsumption,
  getElectricityConsumption,
  getFoodConsumption,
  getTotalPoints,
} from '../../../firebase/dashboard';
import './app-view.css'

export default function AppView() {

  const [totalConsumption, setTotalConsumption] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalTrees, setTotalTrees] = useState(null);
  const [totalNews, setTotalNews] = useState(null);
  const [walkConsumption, setWalkConsumption] = useState(null);
  const [trafficConsumption, setTrafficConsumption] = useState(null);
  const [electricityConsumption, setElectricityConsumption] = useState(null);
  const [foodConsumption, setFoodConsumption] = useState(null);
  const [totalPoints, setTotalPoints] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const consumption = await getTotalConsumption();
      const users = await getTotalUsers();
      const trees = await getTotalTreesPlanted();
      const news = await getTotalNewsPosted();
      const message = await getTotalMessagePosted();
      const total = news + message;
      const walk = await getWalkConsumption();
      const traffic = await getTrafficConsumption();
      const electricity = await getElectricityConsumption();
      const food = await getFoodConsumption();
      const points = await getTotalPoints();
      setTotalConsumption(consumption);
      setTotalUsers(users);
      setTotalTrees(trees);
      setTotalNews(total);
      setWalkConsumption(walk);
      setTrafficConsumption(traffic);
      setElectricityConsumption(electricity);
      setFoodConsumption(food);
      setTotalPoints(points);
      setIsDataLoaded(true);
    };

    fetchData();
  }, []);

  if (!isDataLoaded) {
    return (
      <div className="app-view-container">
            <div className="loader"></div>
        </div>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Carbon Emissions"
            total={totalConsumption}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Users"
            total={totalUsers}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Trees"
            total={totalTrees}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total News Posted"
            total={totalNews}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Total Carbon Emissions"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Proportion of four ways"
            chart={{
              series: [
                { label: 'Walk', value: walkConsumption },
                { label: 'Traffic', value: trafficConsumption },
                { label: 'Electricity', value: electricityConsumption },
                { label: 'Food', value: foodConsumption },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Status"
            chart={{
              categories: ['Traffic', 'Walk','Electricity', 'Food'],
              series: [
                { name: 'Actual Status', data: [trafficConsumption, walkConsumption, electricityConsumption, foodConsumption] },
                { name: 'Predict Status', data: [3000, 4000, 2000, 1000] },
              ],
            }}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
