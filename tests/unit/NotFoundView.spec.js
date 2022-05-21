import { mount } from "@vue/test-utils";
import NotFoundView from "@/views/NotFoundView";
import flushPromises from "flush-promises";

// jest.spyOn(axios, 'get').mockResolvedValue(mockList)

describe("HomeView", () => {
  it("render cards of messages", async () => {
    
    const wrapper = mount(NotFoundView);

    expect(wrapper.text()).toBe('404 Página não encontrada');
  });
});
