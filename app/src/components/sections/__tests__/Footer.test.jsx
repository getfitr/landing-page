import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import Footer from '../Footer';

describe('Footer', () => {
  let footer;
  
  beforeEach(() => footer = shallow(<Footer />));

  it('contains copyright', () => {
    const year = new Date().getFullYear();
    const html = footer.find('.copyright').html();
    expect(html).toMatch(`${year}`);
    expect(html).toMatch("Carsten Koch");
    expect(html).toMatch("Jim Raptis");
    expect(html).toMatch("raptis.wtf/blog");
  });

  it('has a menu', () => {
    expect(footer.find('Box.menu-wrapper')).toHaveLength(1);
  });

  it('menu has 3 menu items', () => {
    expect(footer.find('MenuItem')).toHaveLength(3);
  });

  it('first menu item routes to /about', () => {
    expect(footer.find('MenuItem').get(0).props.to).toEqual('/about');
  });
 
  it('second menu item routes to /privacy', () => {
    expect(footer.find('MenuItem').get(1).props.to).toEqual('/privacy');
  });

  it('third menu item routes to /impress', () => {
    expect(footer.find('MenuItem').get(2).props.to).toEqual('/impress');
  });
});

describe('Footer routing', () => {
  let root;

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Route exact path="/" render={() => <Footer />} />
        <Route path="/about" render={() => <div className="about">About page</div>} />
        <Route path="/privacy" render={() => <div className="privacy">Privacy page</div>} />
        <Route path="/impress" render={() => <div className="impress">Impress page</div>} />
      </MemoryRouter>,
      root
    );
  });

  afterEach(() => {
    unmountComponentAtNode(root);
  });

  it('clicking the privacy nav link should render the /privacy page', () => {
    act(() => {
      const link = document.querySelector('.privacy');
      link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(document.body.textContent).toBe("Privacy page");
  });

  it('clicking the impress nav link should render the /impress page', () => {
    act(() => {
      const link = document.querySelector('.impress');
      link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(document.body.textContent).toBe("Impress page");
  });

  it('clicking the about nav link should render the /about page', () => {
    act(() => {
      const link = document.querySelector('.about');
      link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(document.body.textContent).toBe("About page");
  });
});
