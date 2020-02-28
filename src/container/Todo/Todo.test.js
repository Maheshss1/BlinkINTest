import Todo from "./Todo";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow, mount } from "enzyme";

import { render } from "@testing-library/react";
import user from "@testing-library/user-event";

//import "@testing-library/react";

configure({ adapter: new Adapter() });

describe("<Todo />", () => {
  let wrapper;
  let innerComp;

  beforeEach(() => {
    wrapper = shallow(<Todo />);
    wrapper.setState({
      todoList: [
        { key: 1, todo: "", marked: false },
        { key: 1, todo: "Hi", marked: false },
        { key: 1, todo: "Hi", marked: false }
      ]
    });
    innerComp = wrapper.find("li");
  });

  it("HandleForm", () => {
    expect(innerComp).toHaveLength(wrapper.state().todoList.length);
  });

  // it("SortedAscending", () => {
  //   wrapper.setState({
  //     todoList: [
  //       { key: 1, todo: "z", marked: true },
  //       { key: 1, todo: "b", marked: true },
  //       { key: 1, todo: "w", marked: true }
  //     ],
  //     sorted: false
  //   });

  //   expect(wrapper.instance().sortTodoList(true, wrapper.state().todoList));
  //   //expect(wrapper.instance().sortTodoList(true, wrapper.state().todoList));
  //   expect(wrapper.instance().sortTodoList(false, wrapper.state().todoList));

  //   console.log(wrapper.state());
  // });

  // it("marked", () => {
  //   const comp = innerComp.at(0);
  //   comp.simulate("click");
  //   expect(
  //     wrapper
  //       .find("li")
  //       .at(0)
  //       .is("Marked")
  //   ).to.equal(true);
  // });
});

describe("Testing with React-testing-library", () => {
  let wrapper;
  let innerComp;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<Todo />);
    instance = wrapper.instance();
    wrapper.setState({
      todoList: [
        { key: 132, todo: "a", marked: false },
        { key: 1145, todo: "c", marked: false },
        { key: 531, todo: "b", marked: false }
      ],
      sorted: false
    });
    innerComp = wrapper.find("li");
  });

  it("should click the submit button", () => {
    // const wrapper = mount(<Todo />);
    wrapper.setState({
      inputValue: "Hii"
    });
    const todoList = wrapper.state().todoList;

    // const instance = wrapper.instance();
    instance.handleForm({ target: {} }, wrapper.state().todoList);
    expect(todoList[todoList.length - 1].todo).toBe("Hii");
  });

  it("should marked component", () => {
    const index = 1;
    const todoList = wrapper.state().todoList;
    //todoList[index].marked = true;
    instance.markCompleted(todoList[index], todoList);

    expect(todoList[index].marked).toBeTruthy();
  });

  it("should Sort the list", () => {
    const state = wrapper.state();
    //state.sorted = true;
    instance.sortTodoList(true, state.todoList);
    instance.sortTodoList(state.sorted, state.todoList);

    const todoList = state.todoList; //JSON.parse(localStorage.getItem("todoList"));

    if (state.sorted) {
      expect(todoList).toStrictEqual([
        { key: 132, todo: "a", marked: false },
        { key: 531, todo: "b", marked: false },
        { key: 1145, todo: "c", marked: false }
      ]);
    } else {
      expect(todoList).toStrictEqual([
        { key: 1145, todo: "c", marked: false },
        { key: 531, todo: "b", marked: false },
        { key: 132, todo: "a", marked: false }
      ]);
    }
  });
});
