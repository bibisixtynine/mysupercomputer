//import * as Tone from 'tone';

export class oscillatorSampler {
  constructor() {
    this.sampler = new Tone.Oscillator().toDestination();

    this.oldNote = 'C4';
  }

  play(note) {
    // start at "C4"
    this.sampler.frequency.value = this.oldNote;
    // ramp to "C2" over 2 seconds
    this.sampler.frequency.rampTo(note, 0.1);
    // start the oscillator for 2 seconds
    this.sampler.start().stop('+2');
    this.oldNote = note;
  }
}
