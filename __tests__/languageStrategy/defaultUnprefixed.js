import React from 'react';
import defaultUnprefixed from './../../src/languageStrategy/defaultUnprefixed';

const DummyComponent = () => <div />;

const languageStrategy = defaultUnprefixed({
  locales: ['en', 'es', 'eu'],
  defaultLocale: 'en',
});

test('It detects locale based in location', () => {
  expect(languageStrategy.localeFromLocation({pathname: '/some-route'})).toBe(
    'en',
  );
  expect(
    languageStrategy.localeFromLocation({pathname: '/es/some-route'}),
  ).toBe('es');
  expect(
    languageStrategy.localeFromLocation({pathname: '/eu/some-route'}),
  ).toBe('eu');
});

test('Generates valid react-router-config tree', () => {
  expect(
    languageStrategy.renderRoutes('en')([
      {
        paths: {
          en: '/product/:slug',
          es: '/producto/:slug',
          eu: '/produktua/:slug',
        },
        component: DummyComponent,
      },
      {
        paths: {
          en: '/cart',
          es: '/carrito',
          eu: '/saskia',
        },
        component: DummyComponent,
      },
      {
        path: '/',
        component: DummyComponent,
        exact: true,
      },
    ]),
  ).toEqual([
    {
      path: '/product/:slug',
      component: DummyComponent,
    },
    {
      path: '/es/producto/:slug',
      component: DummyComponent,
    },
    {
      path: '/eu/produktua/:slug',
      component: DummyComponent,
    },
    {
      path: '/cart',
      component: DummyComponent,
    },
    {
      path: '/es/carrito',
      component: DummyComponent,
    },
    {
      path: '/eu/saskia',
      component: DummyComponent,
    },
    {
      path: '/',
      component: DummyComponent,
      exact: true,
    },
  ]);
});

test('Generates valid react-router-config nested tree', () => {
  expect(
    languageStrategy.renderRoutes('en')([
      {
        path: '/',
        component: DummyComponent,
        routes: [
          {
            paths: {
              en: '/product/:slug',
              es: '/producto/:slug',
              eu: '/produktua/:slug',
            },
            component: DummyComponent,
          },
          {
            paths: {
              en: '/cart',
              es: '/carrito',
              eu: '/saskia',
            },
            component: DummyComponent,
          },
          {
            path: '/',
            component: DummyComponent,
            exact: true,
          },
        ],
      },
    ]),
  ).toEqual([
    {
      path: '/',
      component: DummyComponent,
      routes: [
        {
          path: '/product/:slug',
          component: DummyComponent,
        },
        {
          path: '/es/producto/:slug',
          component: DummyComponent,
        },
        {
          path: '/eu/produktua/:slug',
          component: DummyComponent,
        },
        {
          path: '/cart',
          component: DummyComponent,
        },
        {
          path: '/es/carrito',
          component: DummyComponent,
        },
        {
          path: '/eu/saskia',
          component: DummyComponent,
        },
        {
          path: '/',
          component: DummyComponent,
          exact: true,
        },
      ],
    },
  ]);
});

test('Generates valid react-router-config deeply nested tree', () => {
  expect(
    languageStrategy.renderRoutes('en')([
      {
        path: '/',
        component: DummyComponent,
        routes: [
          {
            paths: {
              en: '/product/:slug',
              es: '/producto/:slug',
              eu: '/produktua/:slug',
            },
            component: DummyComponent,
            routes: [{
              paths: {
                en: '/product/:slug/edit',
                es: '/producto/:slug/editar',
                eu: '/produktua/:slug/aldatu',
              },
              component: DummyComponent,
            }, {
              paths: {
                en: '/product/:slug/view',
                es: '/producto/:slug/ver',
                eu: '/produktua/:slug/ikusi',
              },
              component: DummyComponent,
            }],
          },
        ],
      },
    ]),
  ).toEqual([
    {
      path: '/',
      component: DummyComponent,
      routes: [
        {
          path: '/product/:slug',
          component: DummyComponent,
          routes: [{
            path: '/product/:slug/edit',
            component: DummyComponent,
          }, {
            path: '/product/:slug/view',
            component: DummyComponent,
          }],
        },
        {
          path: '/es/producto/:slug',
          component: DummyComponent,
          routes: [{
            path: '/es/producto/:slug/editar',
            component: DummyComponent,
          }, {
            path: '/es/producto/:slug/ver',
            component: DummyComponent,
          }],
        },
        {
          path: '/eu/produktua/:slug',
          component: DummyComponent,
          routes: [{
            path: '/eu/produktua/:slug/aldatu',
            component: DummyComponent,
          }, {
            path: '/eu/produktua/:slug/ikusi',
            component: DummyComponent,
          }],
        },
      ],
    },
  ]);
});

test('Generates valid react-router-config complex nested tree', () => {
  expect(
    languageStrategy.renderRoutes('en')([
      {
        path: '/',
        routes: [
          {
            paths: '/',
          },
          {
            paths: {
              en: '/cart',
              es: '/carrito',
              eu: '/saskia',
            },
          },
          {paths: '/login'},
          {
            paths: {
              en: '/product/:slug',
              es: '/producto/:slug',
              eu: '/produktua/:slug',
            },
          },
          {path: '/checkout/:step?'},
          {path: '*'},
        ],
      },
    ]),
  ).toEqual([
    {
      path: '/',
      routes: [
        {path: '/'},
        {path: '/es/'},
        {path: '/eu/'},
        {path: '/cart'},
        {path: '/es/carrito'},
        {path: '/eu/saskia'},
        {path: '/login'},
        {path: '/es/login'},
        {path: '/eu/login'},
        {path: '/product/:slug'},
        {path: '/es/producto/:slug'},
        {path: '/eu/produktua/:slug'},
        {path: '/checkout/:step?'},
        {path: '*'},
      ],
    },
  ]);
});