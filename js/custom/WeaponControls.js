/**
 * @author Michael Minchinton
 */

THREE.WeaponControls = function ( object, domElement, mmobjects, shiplight ) {

	if ( domElement === undefined ) {

		console.warn( 'THREE.WeaponControls: The second parameter "domElement" is now mandatory.' );
		domElement = document;

	}

	this.object = object;
	this.domElement = domElement;
	this.mmobjects = mmobjects;
	this.shiplight = shiplight;

	if ( domElement ) this.domElement.setAttribute( 'tabindex', - 1 );
	
	this.lasers = false;
	this.discovery = false;
	this.targetIndex=-1;

	
	this.keydown = function ( event ) {

		if ( event.altKey ) {

			return;

		}

		//event.preventDefault();

		switch ( event.keyCode ) {
			case 90: /*Z*/ this.discovery = !this.discovery; this.shiplight.visible = this.discovery; console.log('discovery: '+this.discovery); break;
			case 88: /*X*/ console.log('Friggin laser beams...'+this.lasers); this.lasers = !this.lasers; break;
			case 67: /*C*/ 
				this.targetIndex++; 
				if(this.targetIndex > (this.mmobjects.length-1))
				{
					this.targetIndex = 0;
				}
				console.log('Target: '+this.mmobjects[this.targetIndex].name); 
				this.shiplight.target = this.mmobjects[this.targetIndex].object;
				break;

		}

	
	};

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}


	this.dispose = function () {

		window.removeEventListener( 'keydown', _keydown, false );

	};

	var _keydown = bind( this, this.keydown );
	window.addEventListener( 'keydown', _keydown, false );
	

};
