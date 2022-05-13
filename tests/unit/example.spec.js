import { mount } from "@vue/test-utils";
import Home from "@/views/HomeView";
import flushPromises from 'flush-promises'
import axios from 'axios'

const mockList = [
  {
    id: 1,
    nome: "teste",
    referencia: "teste",
    pendencia: "teste",
    documento: "teste",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

// jest.spyOn(axios, 'get').mockResolvedValue(mockList)

describe("HomeView", () => {
  it("", async () => {
    
    // const msg = "Gerenciamento";

    const wrapper = mount(Home, {
      propsData: {
          busca:"",
          pessoas: [ {
            id: 1,
            nome: "teste",
            referencia: "teste",
            pendencia: "teste",
            documento: "teste",
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ]
      },
    });

    await flushPromises();

    const UserCards = wrapper.findAll('.styled-card').length;
    expect(UserCards).toBe(1);
  });
});
