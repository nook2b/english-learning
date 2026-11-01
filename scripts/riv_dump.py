"""Reads a .riv object by object: what is inside (bones, meshes, keyframes, view models).

    python3 scripts/riv_dump.py file.riv ...

Field types come from scripts/rivdefs.json, extracted from rive-runtime (MIT)
include/rive/generated/*_base.hpp and core_registry.hpp. Used for docs/28-full-rig-plan.md, step 0."""
import struct, sys, collections, json, os
D=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'rivdefs.json')))
TN={int(k):v for k,v in D['types'].items()}; FT={int(k):v for k,v in D['fields'].items()}; PN={int(k):v for k,v in D['names'].items()}
def parse(path):
    b=open(path,'rb').read(); p=0
    def vu():
        nonlocal p; r=s=0
        while True:
            x=b[p]; p+=1; r|=(x&0x7f)<<s; s+=7
            if not x&0x80: return r
    assert b[:4]==b'RIVE'; p=4; maj=vu(); mn=vu(); vu()
    keys=[]
    while (k:=vu()): keys.append(k)
    toc={}; cur=0; bit=8
    for k in keys:
        if bit==8: cur=struct.unpack_from('<I',b,p)[0]; p+=4; bit=0
        toc[k]=(cur>>bit)&3; bit+=2
    objs=[]
    while p<len(b):
        t=vu(); props={}
        while (k:=vu()):
            ft=FT.get(k, toc.get(k))
            if ft is None: raise SystemExit(f'unknown prop {k} in {TN.get(t,t)} at {p}')
            if ft==0: v=vu()
            elif ft==1: n=vu(); v=b[p:p+n]; p+=n
            elif ft==2: v=struct.unpack_from('<f',b,p)[0]; p+=4
            elif ft==3: v=struct.unpack_from('<I',b,p)[0]; p+=4
            else: v=b[p]; p+=1
            props[PN.get(k,k)]=v
        objs.append((TN.get(t,str(t)),props))
    return maj,mn,objs
if __name__=='__main__':
    for f in sys.argv[1:]:
        maj,mn,objs=parse(f)
        h=collections.Counter(o[0] for o in objs)
        print(f'== {os.path.basename(f)}: format {maj}.{mn}, {len(objs)} objects, {os.path.getsize(f)} bytes')
        print('  ',dict(sorted(h.items(),key=lambda x:-x[1])))
        print('   interpolation:',dict(collections.Counter(o[1].get('KeyFrame::interpolationType','-') for o in objs if o[0].startswith('KeyFrame'))))
        arts=[o[1].get('Component::name') for o in objs if o[0]=='Artboard']
        print('   artboards:',arts)
