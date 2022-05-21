import { mount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/HomeView";
import flushPromises from "flush-promises";


describe("HomeView", () => {

  test("render cards of messages", async () => {
    const wrapper = mount(Home, {
      mocks: {
        Vue: {
          $cookies: {
            get: () => "dsdsdd",
          },
        },
      },
    });

    wrapper.setData({
      pessoas: [
        {
          id: 1,
          nome: "teste",
          referencia: "teste",
          pendencia: "teste",
          documento: "teste",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          nome: "teste",
          referencia: "teste",
          pendencia: "teste",
          documento: "teste",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    wrapper.setData({ busca: "" });

    await flushPromises();

    const UserCards = wrapper.findAll(".styled-card").length;
    expect(UserCards).toBe(2);
  });

  test("find persons", async () => {
    const wrapper = mount(Home, {
      data() {
        return {
          busca: "marcos",
          pessoas: [
            {
              id: 1,
              nome: "marcos",
              referencia: "meu primo",
              pendencia: "teste",
              documento: "teste",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 2,
              nome: "joão",
              referencia: "do mercado",
              pendencia: "teste",
              documento: "teste",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        };
      },
    });

    await wrapper.vm.$nextTick();

    await flushPromises();

    const UserCards = wrapper.findAll(".styled-card-area").length;

    // expect(wrapper.text()).toBe(1);
    expect(UserCards).toBe(1);
  });

  test("redirect to create page", async () => {
    const mockRoute = {
      params: {
        id: 1,
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Home, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });
    const button = wrapper.find(".float-button");

    await button.trigger("click");
    expect(expect(window.location.href).toBe("http://localhost/pessoa/criar"));
   
  });
});
