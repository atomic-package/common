import Model from '../model/';
import View from '../component/';

/**
 * AtomicPackage Controller Class
 * @public
 **/
export class Controller {
  public model: Model;
  public view: View;

  constructor(
  ) {
    this.model = Model;
    this.view  = View;
  }

}

export default Controller;
