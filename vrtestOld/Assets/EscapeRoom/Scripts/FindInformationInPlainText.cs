using UnityEngine;
using System.Collections;

public class FindInformationInPlainText : Challenge
{
	public Keypad keypad;
	// Use this for initialization
	public override void Start ()
	{
		keypad.SetChallenge (this);
		print ("challenge set");
	}
}

