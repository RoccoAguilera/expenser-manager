import {
  type RouteConfig,
  layout,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  layout("dashboard/index.tsx", [
    index("dashboard/example.tsx"),
    route("/profile/:id","dashboard/manager/index.tsx"),
  ])
] satisfies RouteConfig;
