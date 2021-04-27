import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import { shallow, render as enzymeRender } from 'enzyme';
import Header from '../Header';

describe('Header', () => {
  let header;
  
  beforeEach(() => header = shallow(<Header />));

  it('contains the logo', () => {
    expect(header.find('Logo')).toHaveLength(1); 
  });

  it('has a menu toggler', () => {
    expect(header.find('Box.menu-toggler')).toHaveLength(1);
  });

  it('has a menu', () => {
    expect(header.find('Box.menu-wrapper')).toHaveLength(1);
  });

  it('should have the open menu button', () => {
    expect(header.find('MenuIcon')).toHaveLength(1);
    expect(header.find('CloseIcon')).toHaveLength(0);
  });

  it('should have the close menu button, after opening the menu', () => {
    const toggler = header.find('.menu-toggler');
    toggler.simulate('click');

    expect(header.find('MenuIcon')).toHaveLength(0);
    expect(header.find('CloseIcon')).toHaveLength(1);
  });

  it('menu has 3 menu items', () => {
    expect(header.find('MenuItem')).toHaveLength(3);
  });

  it('first menu item routes to /', () => {
    expect(header.find('MenuItem').get(0).props.to).toEqual('/');
  });
 
  it('second menu item routes to /project', () => {
    expect(header.find('MenuItem').get(1).props.to).toEqual('/project');
  });
 
  it('has a signup button', () => {
    expect(header.find('Button.signup-button')).toHaveLength(1);
  });
  
  it('the signup button routes to /signup', () => {
    const signup = header.find('MenuItem').get(2);
    expect(signup.props.to).toEqual('/signup');
  });
});

describe('Header routing', () => {
  let root;

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Route exact path="/" render={() => <Header />} />
        <Route path="/signup" render={() => <div className="signup">Signup page</div>} />
        <Route path="/project" render={() => <div className="project">Project page</div>} />
      </MemoryRouter>,
      root
    );
  });

  afterEach(() => {
    unmountComponentAtNode(root);
  });

  it('clicking the app nav link should render the / page', () => {
    act(() => {
      const link = document.querySelector('.home');
      link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(document.body.textContent).toMatch("GetFitr!");
  });

  it('clicking the project nav link should render the /project page', () => {
    act(() => {
      const link = document.querySelector('.project');
      link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(document.body.textContent).toBe("Project page");
  });

  it('clicking the sign up button should render the /signup page', () => {
    act(() => {
      const link = document.querySelector('.signup');
      link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(document.body.textContent).toBe("Signup page");
  });
});

describe('Header menu visbility', () => {
  let root;

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      root
    );
  });

  afterEach(() => {
    unmountComponentAtNode(root);
  });

  it('should have a visible menu', () => {
    const doc = document.querySelector('.menu-wrapper');
    expect(doc).toHaveStyle("display: block");
  });
});
