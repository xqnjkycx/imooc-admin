export interface menuRoute {
  path: string;
  meta: Object;
  children?: Array<menuRoute>;
}

export function formatRouterMenuData(routeArr: Array<any>): Array<menuRoute> {
  let routerMenuData: Array<menuRoute> = [];
  routeArr.forEach((route) => {
    const routeData: menuRoute = {
      path: route.path,
      meta: route.meta,
    };
    if (route.meta && route.meta.belongMenu) {
      if (route.children) {
        routeData.children = formatRouterMenuData(route.children);
      }
      routerMenuData.push(routeData);
    }
  });

  // 重定向 特殊处理
  const redirectRouteIndex = routerMenuData.findIndex(
    (route) => route.path === "/"
  );
  if (redirectRouteIndex >= 0) {
    const redirectRoute = routerMenuData[redirectRouteIndex];
    routerMenuData.splice(redirectRouteIndex, 1);
    if (redirectRoute) {
      const redirectMenuData = formatRouterMenuData(
        redirectRoute?.children as any
      );
      routerMenuData = [...redirectMenuData, ...routerMenuData];
    }
  }
  return routerMenuData;
}
