import React, { useState } from "react";
import {
  Container,
  Grid,
  Skeleton,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Box,
} from "@mui/material";
import "../Home/GridHome.css";

const HomeLoading = () => {
  return (
    <div
      className="grid-home-container"
      onClick={() => {
        setClose("nav-menu");
        setactive("Link");
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Box>
          <Skeleton variant="rounded" width={"10rem"} height={"2rem"} />
        </Box>
        <Typography variant="h3" color="darkgoldenrod" textTransform={"revert"}>
          All Expenses
        </Typography>
        <div className="grid-container">
          <Grid container spacing={"1rem"} width={"80%"}>
            {Array.from({ length: 16 }).map((item, indx) => (
              <Grid item xs={6} sm={4} md={3} key={indx}>
                <Card
                  variant="elevation"
                  elevation={2}
                  sx={{
                    background: "rgb(255, 255, 255,0.5)",
                  }}
                >
                  <CardContent>
                    <Stack alignItems={"center"}>
                      <Skeleton
                        variant="circular"
                        sx={{
                          width: { sm: "2rem", xs: "3rem" },
                          height: { sm: "2rem", xs: "3rem" },
                        }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        height={"1.5rem"}
                        width={"3rem"}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: "0.2rem", sm: "1rem", md: "2rem" },
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <Skeleton
                          variant="rounded"
                          animation="wave"
                          height={"1rem"}
                          width={"4rem"}
                        />
                        <Skeleton
                          variant="rounded"
                          animation="pulse"
                          height={"1rem"}
                          width={"1rem"}
                        />
                      </Box>
                      <Stack
                        direction={{ md: "row", xs: "column" }}
                        alignItems={"center"}
                        fontSize={{ xs: "0.8rem", sm: "0.9rem", md: "15px" }}
                      >
                        <Skeleton
                          variant="rounded"
                          animation="wave"
                          height={"2rem"}
                          width={"7rem"}
                          sx={{
                            marginTop: "1rem",
                          }}
                        ></Skeleton>
                      </Stack>
                    </Stack>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      height={"1.4rem"}
                      width={"2.8rem"}
                    ></Skeleton>
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      height={"1.4rem"}
                      width={"2.8rem"}
                    ></Skeleton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default HomeLoading;
